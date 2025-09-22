<?php

declare(strict_types=1);

namespace App\Http\Controllers\Public;

use App\Http\Controllers\Controller;
use App\Models\Restaurant;
use App\Services\Public\MenuService;
use Illuminate\Http\JsonResponse;
use Throwable;

class RestaurantMenuController extends Controller
{
    public function __construct(
        private MenuService $menuService
    ) {}

    /**
     * Get restaurant's menu.
     */
    public function getRestaurantMenu(Restaurant $restaurant): JsonResponse
    {
        try {
            $menu = $this->menuService->getMenu($restaurant);

            return response()->json($menu, 200);
        } catch (Throwable $e) {
            return response()->json([
                'message' => 'Could not get menu.',
            ], 500);
        }
    }
}
