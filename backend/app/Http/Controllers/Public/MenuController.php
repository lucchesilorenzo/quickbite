<?php

declare(strict_types=1);

namespace App\Http\Controllers\Public;

use App\Http\Controllers\Controller;
use App\Models\Restaurant;
use App\Services\Public\MenuService;
use Dedoc\Scramble\Attributes\Group;
use Illuminate\Http\JsonResponse;
use Throwable;

#[Group('Public Menu')]
class MenuController extends Controller
{
    public function __construct(
        private readonly MenuService $menuService
    ) {}

    /**
     * Get menu.
     */
    public function getMenu(Restaurant $restaurant): JsonResponse
    {
        try {
            $menu = $this->menuService->getMenu($restaurant);

            return response()->json([
                'success' => true,
                'message' => 'Menu retrieved successfully.',
                'menu' => $menu,
            ], 200);
        } catch (Throwable) {
            return response()->json([
                'success' => false,
                'message' => 'Could not get menu.',
            ], 500);
        }
    }
}
