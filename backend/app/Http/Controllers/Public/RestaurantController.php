<?php

declare(strict_types=1);

namespace App\Http\Controllers\Public;

use App\Exceptions\Public\RestaurantLogoNotFoundException;
use App\Http\Controllers\Controller;
use App\Http\Requests\Public\GetRestaurantsRequest;
use App\Models\Restaurant;
use App\Services\Public\RestaurantService;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Http\JsonResponse;
use Throwable;

class RestaurantController extends Controller
{
    public function __construct(
        private readonly RestaurantService $restaurantService
    ) {}

    /**
     * Get restaurants.
     */
    public function getRestaurants(GetRestaurantsRequest $request): JsonResponse
    {
        try {
            [$restaurants, $meta] = $this->restaurantService->getRestaurants(
                $request->validated()
            );

            return response()->json([
                'success' => true,
                'message' => 'Restaurants retrieved successfully.',
                'restaurants' => $restaurants,
                'meta' => $meta,
            ], 200);
        } catch (Throwable) {
            return response()->json([
                'success' => false,
                'message' => 'Could not get restaurants.',
            ], 500);
        }
    }

    /**
     * Get a restaurant.
     */
    public function getRestaurant(string $restaurantSlug): JsonResponse
    {
        try {
            $restaurant = $this->restaurantService->getRestaurant($restaurantSlug);

            return response()->json($restaurant, 200);
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
     * Get restaurant's delivery slots.
     */
    public function getDeliverySlots(Restaurant $restaurant): JsonResponse
    {
        try {
            $deliverySlots = $this->restaurantService->getDeliverySlots($restaurant);

            return response()->json($deliverySlots, 200);
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
     * Get a restaurant logo as base64.
     */
    public function getBase64Logo(Restaurant $restaurant): JsonResponse
    {
        try {
            $base64Logo = $this->restaurantService->getBase64Logo($restaurant);

            return response()->json($base64Logo, 200);
        } catch (RestaurantLogoNotFoundException $e) {
            return response()->json([
                'success' => false,
                'message' => $e->getMessage(),
            ], $e->getCode());
        } catch (Throwable) {
            return response()->json([
                'success' => false,
                'message' => 'Could not get restaurant logo.',
            ], 500);
        }
    }
}
