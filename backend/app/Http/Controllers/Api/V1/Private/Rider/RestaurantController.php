<?php

declare(strict_types=1);

namespace App\Http\Controllers\Api\V1\Private\Rider;

use App\Exceptions\Private\Rider\ActiveDeliveryException;
use App\Exceptions\Private\Rider\NoActiveRestaurantException;
use App\Http\Controllers\Controller;
use App\Http\Resources\Api\V1\Restaurant\RestaurantResource;
use App\Services\Private\Rider\RestaurantService;
use Dedoc\Scramble\Attributes\Endpoint;
use Dedoc\Scramble\Attributes\Group;
use Dedoc\Scramble\Attributes\Response;
use Illuminate\Http\JsonResponse;
use Throwable;

#[Group('Rider Restaurant')]
class RestaurantController extends Controller
{
    public function __construct(
        private readonly RestaurantService $restaurantService
    ) {}

    /**
     * Get restaurant.
     */
    #[Endpoint(
        operationId: 'getRiderRestaurant',
        title: 'Get active restaurant',
        description: 'Get the active restaurant for the authenticated rider.',
        method: 'GET'
    )]
    #[Response(
        status: 200,
        description: 'Restaurant retrieved successfully.',
    )]
    #[Response(
        status: 404,
        description: 'No active restaurant.',
    )]
    #[Response(
        status: 500,
        description: 'An unexpected error occurred while retrieving restaurant.',
    )]
    public function getRestaurant(): JsonResponse
    {
        try {
            $restaurant = $this->restaurantService->getRestaurant(
                auth()->user()
            );

            return RestaurantResource::make($restaurant)
                ->additional([
                    'success' => true,
                    'message' => 'Restaurant retrieved successfully.',
                ])
                ->response();
        } catch (NoActiveRestaurantException $e) {
            return response()->json([
                'success' => false,
                'message' => $e->getMessage(),
            ], 404);
        } catch (Throwable) {
            return response()->json([
                'success' => false,
                'message' => 'Could not get restaurant.',
            ], 500);
        }
    }

    /**
     * Leave restaurant.
     */
    #[Endpoint(
        operationId: 'leaveRiderRestaurant',
        title: 'Leave restaurant',
        description: 'Leave the active restaurant.',
        method: 'DELETE'
    )]
    #[Response(
        status: 200,
        description: 'Restaurant left successfully.',
    )]
    #[Response(
        status: 409,
        description: 'Cannot leave while having an active delivery.',
    )]
    #[Response(
        status: 404,
        description: 'No active restaurant.',
    )]
    #[Response(
        status: 500,
        description: 'An unexpected error occurred while leaving restaurant.',
    )]
    public function leaveRestaurant(): JsonResponse
    {
        try {
            $this->restaurantService->leaveRestaurant(
                auth()->user()
            );

            return response()->json([
                'success' => true,
                'message' => 'Restaurant left successfully.',
            ], 200);
        } catch (NoActiveRestaurantException $e) {
            return response()->json([
                'success' => false,
                'message' => $e->getMessage(),
            ], 404);
        } catch (ActiveDeliveryException $e) {
            return response()->json([
                'success' => false,
                'message' => $e->getMessage(),
            ], 409);
        } catch (Throwable) {
            return response()->json([
                'success' => false,
                'message' => 'Could not leave restaurant.',
            ], 500);
        }
    }
}
