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
            ], 200);
        } catch (Throwable) {
            return response()->json([
                'success' => false,
                'message' => 'Could not get restaurant.',
            ], 500);
        }
    }
}
