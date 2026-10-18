<?php

declare(strict_types=1);

namespace App\Http\Controllers\Api\V1\Public;

use App\Http\Controllers\Controller;
use App\Http\Resources\Api\V1\MenuCategory\MenuCategoryResource;
use App\Models\Restaurant;
use App\Services\Public\MenuService;
use Dedoc\Scramble\Attributes\Endpoint;
use Dedoc\Scramble\Attributes\Group;
use Dedoc\Scramble\Attributes\Response;
use Illuminate\Http\JsonResponse;
use Throwable;

#[Group('Public Menu')]
class MenuController extends Controller
{
    public function __construct(
        private readonly MenuService $menuService
    ) {}

    /**
     * @unauthenticated
     */
    #[Endpoint(
        operationId: 'getMenu',
        title: 'Get menu categories with items',
        description: 'Get all menu categories with items.',
        method: 'GET'
    )]
    #[Response(status: 200, description: 'Menu retrieved successfully.')]
    #[Response(status: 500, description: 'Could not get menu.')]
    public function getMenu(Restaurant $restaurant): JsonResponse
    {
        try {
            $menu = $this->menuService->getMenu($restaurant);

            return MenuCategoryResource::collection($menu)
                ->additional([
                    'success' => true,
                    'message' => 'Menu retrieved successfully.',
                ])
                ->response();
        } catch (Throwable) {
            return response()->json([
                'success' => false,
                'message' => 'Could not get menu.',
            ], 500);
        }
    }
}
