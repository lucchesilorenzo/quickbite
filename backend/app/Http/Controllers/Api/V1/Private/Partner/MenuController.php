<?php

declare(strict_types=1);

namespace App\Http\Controllers\Api\V1\Private\Partner;

use App\Http\Controllers\Controller;
use App\Http\Resources\Api\V1\MenuCategory\MenuCategoryResource;
use App\Models\Restaurant;
use App\Services\Private\Partner\MenuService;
use Dedoc\Scramble\Attributes\Endpoint;
use Dedoc\Scramble\Attributes\Group;
use Dedoc\Scramble\Attributes\Response;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Gate;
use Throwable;

#[Group('Partner Menu')]
class MenuController extends Controller
{
    public function __construct(
        private readonly MenuService $menuService
    ) {}

    /**
     * Get menu.
     */
    #[Endpoint(
        operationId: 'getPartnerMenu',
        title: 'Get menu',
        description: 'Get the full menu for a restaurant.',
        method: 'GET'
    )]
    #[Response(
        status: 200,
        description: 'Menu retrieved successfully.',
    )]
    #[Response(
        status: 500,
        description: 'An unexpected error occurred while retrieving menu.',
    )]
    public function getMenu(Restaurant $restaurant): JsonResponse
    {
        Gate::authorize('viewPartnerMenu', $restaurant);

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
