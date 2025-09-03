<?php

declare(strict_types=1);

namespace App\Http\Controllers;

use App\Models\Restaurant;
use App\Services\RestaurantMenuService;
use Illuminate\Http\JsonResponse;
use Throwable;

class RestaurantMenuController extends Controller
{
    public function __construct(private RestaurantMenuService $restaurantMenuService) {}

    /**
     * Get restaurant's menu.
     */
    public function getRestaurantMenu(Restaurant $restaurant): JsonResponse
    {
        try {
            $menu = $this->restaurantMenuService->getMenu($restaurant);

            return response()->json($menu, 200);
        } catch (Throwable $e) {
            return response()->json([
                'message' => 'Could not get menu.',
            ], 500);
        }
    }
}
