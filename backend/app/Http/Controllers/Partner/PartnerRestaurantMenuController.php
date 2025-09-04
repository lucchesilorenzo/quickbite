<?php

declare(strict_types=1);

namespace App\Http\Controllers\Partner;

use App\Http\Controllers\Controller;
use App\Models\Restaurant;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Gate;
use Throwable;

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
                ->orderBy('order')
                ->get();

            foreach ($menu as $category) {
                $category->menu_items = $category->menuItems()
                    ->orderBy('order')
                    ->paginate(6);
            }

            return response()->json($menu, 200);
        } catch (Throwable $e) {
            return response()->json([
                'message' => 'Could not get menu.',
            ], 500);
        }
    }
}
