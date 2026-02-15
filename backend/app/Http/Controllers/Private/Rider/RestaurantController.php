<?php

declare(strict_types=1);

namespace App\Http\Controllers\Private\Rider;

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
            ]);
        } catch (Throwable) {
            return response()->json([
                'success' => false,
                'message' => 'Could not get restaurant.',
            ]);
        }
    }

    /**
     * Get deliveries.
     */
    public function getDeliveries(): JsonResponse
    {
        try {
            $deliveries = $this->restaurantService->getDeliveries(
                auth()->user()
            );

            return response()->json([
                'success' => true,
                'message' => 'Deliveries retrieved successfully.',
                'deliveries' => $deliveries,
            ]);
        } catch (Throwable) {
            return response()->json([
                'success' => false,
                'message' => 'Could not get deliveries.',
            ]);
        }
    }
}
