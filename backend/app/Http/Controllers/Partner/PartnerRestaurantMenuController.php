<?php

declare(strict_types=1);

namespace App\Http\Controllers\Partner;

use App\Http\Controllers\Controller;
use App\Models\Restaurant;
use Exception;
use Illuminate\Http\JsonResponse;

class PartnerRestaurantMenuController extends Controller
{
    /**
     * Get partner's restaurant menu.
     */
    public function getRestaurantMenu(Restaurant $restaurant): JsonResponse
    {
        // Check if user is authorized
        Gate::authorize('viewRestaurantMenu', $restaurant);

        try {
            $menu = $restaurant->menuCategories()
                ->orderBy('order', 'asc')
                ->get();

            foreach ($menu as $category) {
                $category->menu_items = $category->menuItems()
                    ->orderBy('order', 'asc')
                    ->paginate(6);
            }

            return response()->json($menu, 200);
        } catch (Exception $e) {
            return response()->json([
                'message' => 'Could not get menu.',
            ], 500);
        }
    }
}
