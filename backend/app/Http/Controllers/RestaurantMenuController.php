<?php

declare(strict_types=1);

namespace App\Http\Controllers;

use App\Models\Restaurant;
use Exception;
use Illuminate\Http\JsonResponse;

class RestaurantMenuController extends Controller
{
    /**
     * Get restaurant's menu.
     */
    public function getRestaurantMenu(Restaurant $restaurant): JsonResponse
    {
        try {
            $menu = $restaurant->menuCategories()
                ->orderBy('order', 'asc')
                ->get();

            foreach ($menu as $menuCategory) {
                $menuCategory->menu_items = $menuCategory->menuItems()
                    ->orderBy('order', 'asc')
                    ->get();
            }

            return response()->json($menu, 200);
        } catch (Exception $e) {
            return response()->json([
                'message' => 'Could not get menu.',
            ], 500);
        }
    }
}
