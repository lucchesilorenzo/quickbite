<?php

declare(strict_types=1);

namespace App\Http\Controllers;

use App\Models\Restaurant;
use App\Services\RestaurantMenuService;
use Exception;
use Illuminate\Http\JsonResponse;

class RestaurantMenuController extends Controller
{
    public function __construct(private RestaurantMenuService $restaurantMenuService) {}

    /**
     * Get restaurant's menu.
     */
    public function getRestaurantMenu(Restaurant $restaurant): JsonResponse
    {
        try {
            $menu = $this->restaurantMenuService->getRestaurantMenu($restaurant);

            return response()->json($menu, 200);
        } catch (Exception $e) {
            return response()->json([
                'message' => 'Could not get menu.',
            ], 500);
        }
    }
}
