<?php

declare(strict_types=1);

namespace App\Http\Controllers\Api\V1\Public;

use App\Exceptions\Public\RestaurantLogoNotFoundException;
use App\Http\Controllers\Controller;
use App\Http\Requests\Api\V1\Public\GetRestaurantsRequest;
use App\Http\Resources\Api\V1\Restaurant\RestaurantResource;
use App\Models\Restaurant;
use App\Services\Public\RestaurantService;
use Dedoc\Scramble\Attributes\Endpoint;
use Dedoc\Scramble\Attributes\Group;
use Dedoc\Scramble\Attributes\PathParameter;
use Dedoc\Scramble\Attributes\QueryParameter;
use Dedoc\Scramble\Attributes\Response;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Http\JsonResponse;
use Throwable;

#[Group('Public Restaurants')]
class RestaurantController extends Controller
{
    public function __construct(
        private readonly RestaurantService $restaurantService
    ) {}

    /**
     * @unauthenticated
     */
    #[Endpoint(
        operationId: 'getRestaurants',
        title: 'Get restaurants',
        description: <<<'DESC'
        Retrieve approved restaurants within a 10 km radius of the
        provided geographical coordinates.
        
        The endpoint supports:
        - Filtering by opening hours, delivery fee, new restaurants,
          discounts, rating and category.
        - Sorting by review rating, distance, minimum order value,
          delivery time and delivery fee.
        - Searching restaurants by name, category name or menu item name.
        - Filtering restaurants by minimum order value using the
          supported MOV values.
        DESC,
        method: 'GET'
    )]
    #[QueryParameter(name: 'lat', description: 'Latitude of the location used to find nearby restaurants.', required: true, type: 'number', example: 43.7696)]
    #[QueryParameter(name: 'lon', description: 'Longitude of the location used to find nearby restaurants.', required: true, type: 'number', example: 11.2558)]
    #[QueryParameter(
        name: 'filter',
        description: 'Array of filters. Supported values: open_now, free_delivery, new, with_discounts, one_star, two_stars, three_stars, four_stars, five_stars, and existing category slugs.',
        type: 'array',
        example: ['open_now', 'free_delivery']
    )]
    #[QueryParameter(
        name: 'sort_by',
        description: 'Sort restaurants by review rating, distance, minimum order value, delivery time, or delivery fee.',
        example: 'distance'
    )]
    #[QueryParameter(
        name: 'mov',
        description: 'Filter restaurants by the supported minimum order value threshold.',
        type: 'string',
        example: '1000'
    )]
    #[QueryParameter(
        name: 'q',
        description: 'Search restaurants by restaurant name, category name, or menu item name.',
        type: 'string',
        example: 'pizza'
    )]
    #[QueryParameter(
        name: 'cursor',
        description: 'Cursor for pagination.',
        required: false,
        type: 'string',
        example: 'YXJyYXljb25uZWN0aW9uOjE='
    )]
    #[Response(status: 200, description: 'Restaurants retrieved successfully.')]
    #[Response(status: 500, description: 'Could not get restaurants.')]
    public function getRestaurants(GetRestaurantsRequest $request): JsonResponse
    {
        try {
            $data = $this->restaurantService->getRestaurants(
                $request->validated()
            );

            return RestaurantResource::collection($data['restaurants'])
                ->additional([
                    /**
                     * @var array{
                     *     total: int,
                     *     mov_counts: array{
                     *         all: string,
                     *         1000: int,
                     *         1500: int
                     *     },
                     *     offer_counts: array{
                     *         with_discounts: int
                     *     }
                     * }
                     */
                    'stats' => $data['stats'],
                    'success' => true,
                    'message' => 'Restaurants retrieved successfully.',
                ])
                ->response();
        } catch (Throwable) {
            return response()->json([
                'success' => false,
                'message' => 'Could not get restaurants.',
            ], 500);
        }
    }

    /**
     * @unauthenticated
     */
    #[Endpoint(
        operationId: 'getRestaurant',
        title: 'Get restaurant',
        description: 'Get restaurant by slug.',
        method: 'GET'
    )]
    #[PathParameter(
        name: 'restaurantSlug',
        description: 'Slug of the restaurant.',
        required: true,
        example: 'restaurant-a1f7600a-f582-45c1-8004-f3931af8c431'
    )]
    #[Response(status: 200, description: 'Restaurant retrieved successfully.')]
    #[Response(status: 404, description: 'Restaurant not found.')]
    #[Response(status: 500, description: 'Could not get restaurant.')]
    public function getRestaurant(string $restaurantSlug): JsonResponse
    {
        try {
            $restaurant = $this->restaurantService->getRestaurant($restaurantSlug);

            return RestaurantResource::make($restaurant)
                ->additional([
                    'success' => true,
                    'message' => 'Restaurant retrieved successfully.',
                ])
                ->response();
        } catch (ModelNotFoundException) {
            return response()->json([
                'success' => false,
                'message' => 'Restaurant not found.',
            ], 404);
        } catch (Throwable) {
            return response()->json([
                'success' => false,
                'message' => 'Could not get restaurant.',
            ], 500);
        }
    }

    /**
     * @unauthenticated
     */
    #[Endpoint(
        operationId: 'getDeliverySlots',
        title: 'Get delivery slots',
        description: 'Get delivery slots.',
        method: 'GET'
    )]
    #[Response(status: 200, description: 'Delivery slots retrieved successfully.')]
    #[Response(status: 404, description: 'Restaurant or delivery day not found.')]
    #[Response(status: 500, description: 'Could not get delivery slots.')]
    public function getDeliverySlots(Restaurant $restaurant): JsonResponse
    {
        try {
            $data = $this->restaurantService->getDeliverySlots($restaurant);

            return response()->json([
                'is_asap_available' => $data['is_asap_available'],
                'delivery_slots' => $data['delivery_slots'],
                'success' => true,
                'message' => 'Delivery slots retrieved successfully.',
            ], 200);
        } catch (ModelNotFoundException) {
            return response()->json([
                'success' => false,
                'message' => 'Delivery day not found.',
            ], 404);
        } catch (Throwable) {
            return response()->json([
                'success' => false,
                'message' => 'Could not get delivery slots.',
            ], 500);
        }
    }

    /**
     * @unauthenticated
     */
    #[Endpoint(
        operationId: 'getBase64Logo',
        title: 'Get base64 logo of a restaurant',
        description: 'Get base64 logo of a restaurant.',
        method: 'GET'
    )]
    #[Response(status: 200, description: 'Restaurant logo retrieved successfully.')]
    #[Response(status: 404, description: 'Restaurant not found.')]
    #[Response(status: 500, description: 'Could not get restaurant logo.')]
    public function getBase64Logo(Restaurant $restaurant): JsonResponse
    {
        try {
            $base64Logo = $this->restaurantService->getBase64Logo($restaurant);

            return response()->json([
                'logo' => $base64Logo,
                'success' => true,
                'message' => 'Restaurant logo retrieved successfully.',
            ], 200);
        } catch (RestaurantLogoNotFoundException $e) {
            return response()->json([
                'success' => false,
                'message' => $e->getMessage(),
            ], 404);
        } catch (Throwable) {
            return response()->json([
                'success' => false,
                'message' => 'Could not get restaurant logo.',
            ], 500);
        }
    }
}
