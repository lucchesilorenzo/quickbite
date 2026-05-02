<?php

declare(strict_types=1);

namespace App\Http\Controllers\Api\V1\Private\Rider;

use App\Exceptions\Private\Rider\ActiveDeliveryException;
use App\Exceptions\Private\Rider\NoActiveRestaurantException;
use App\Http\Controllers\Controller;
use App\Services\Private\Rider\RestaurantService;
use Dedoc\Scramble\Attributes\Group;
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
    public function getRestaurant(): JsonResponse
    {
        try {
            $restaurant = $this->restaurantService->getRestaurant(
                auth()->user()
            );

            return response()->json([
                'success' => true,
                'message' => 'Restaurant retrieved successfully.',
                'restaurant' => $restaurant,
            ], 200);
        } catch (NoActiveRestaurantException $e) {
            return response()->json([
                'success' => false,
                'message' => $e->getMessage(),
            ], $e->getCode());
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
        } catch (NoActiveRestaurantException|ActiveDeliveryException $e) {
            return response()->json([
                'success' => false,
                'message' => $e->getMessage(),
            ], $e->getCode());
        } catch (Throwable) {
            return response()->json([
                'success' => false,
                'message' => 'Could not leave restaurant.',
            ], 500);
        }
    }
}
