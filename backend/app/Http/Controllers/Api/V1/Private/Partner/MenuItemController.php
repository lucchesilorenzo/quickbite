<?php

declare(strict_types=1);

namespace App\Http\Controllers\Api\V1\Private\Partner;

use App\Http\Controllers\Controller;
use App\Http\Requests\Api\V1\Private\Partner\Menu\MenuItems\CreateMenuItemRequest;
use App\Http\Requests\Api\V1\Private\Partner\Menu\MenuItems\UpdateMenuItemRequest;
use App\Http\Requests\Api\V1\Private\Partner\Menu\MenuItems\UpdateMenuItemsOrderRequest;
use App\Http\Resources\Api\V1\MenuItemResource;
use App\Models\MenuCategory;
use App\Models\MenuItem;
use App\Services\Private\Partner\MenuItemService;
use Dedoc\Scramble\Attributes\Endpoint;
use Dedoc\Scramble\Attributes\Group;
use Dedoc\Scramble\Attributes\IgnoreResponse;
use Dedoc\Scramble\Attributes\Response;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Gate;
use Throwable;

#[Group('Partner Menu Items')]
class MenuItemController extends Controller
{
    public function __construct(
        private readonly MenuItemService $menuItemService
    ) {}

    /**
     * Create a menu item.
     */
    #[Endpoint(
        operationId: 'createPartnerMenuItem',
        title: 'Create menu item',
        description: 'Create a new menu item in a menu category.',
        method: 'POST'
    )]
    #[IgnoreResponse(200)]
    #[Response(
        status: 201,
        description: 'Menu item created successfully.',
    )]
    #[Response(
        status: 500,
        description: 'An unexpected error occurred while creating menu item.',
    )]
    public function createMenuItem(
        CreateMenuItemRequest $request,
        MenuCategory $menuCategory
    ): JsonResponse {
        Gate::authorize('create', [MenuItem::class, $menuCategory]);

        try {
            $menuItem = $this->menuItemService->createMenuItem(
                $request->validated(),
                $menuCategory,
            );

            return MenuItemResource::make($menuItem)
                ->additional([
                    'success' => true,
                    'message' => 'Menu item created successfully.',
                ])
                ->response()
                ->setStatusCode(201);
        } catch (Throwable) {
            return response()->json([
                'success' => false,
                'message' => 'Could not create menu item.',
            ], 500);
        }
    }

    /**
     * Update a menu item.
     */
    #[Endpoint(
        operationId: 'updatePartnerMenuItem',
        title: 'Update menu item',
        description: 'Update an existing menu item.',
        method: 'POST'
    )]
    #[Response(
        status: 200,
        description: 'Menu item updated successfully.',
    )]
    #[Response(
        status: 500,
        description: 'An unexpected error occurred while updating menu item.',
    )]
    public function updateMenuItem(
        UpdateMenuItemRequest $request,
        MenuItem $menuItem
    ): JsonResponse {
        Gate::authorize('update', $menuItem);

        try {
            $menuItem = $this->menuItemService->updateMenuItem(
                $request->validated(),
                $menuItem,
            );

            return MenuItemResource::make($menuItem)
                ->additional([
                    'success' => true,
                    'message' => 'Menu item updated successfully.',
                ])
                ->response();
        } catch (Throwable) {
            return response()->json([
                'success' => false,
                'message' => 'Could not update menu item.',
            ], 500);
        }
    }

    /**
     * Update menu items order.
     */
    #[Endpoint(
        operationId: 'updatePartnerMenuItemsOrder',
        title: 'Update menu items order',
        description: 'Update the display order of menu items.',
        method: 'PATCH'
    )]
    #[Response(
        status: 200,
        description: 'Menu items order updated successfully.',
    )]
    #[Response(
        status: 404,
        description: 'Menu item not found.',
    )]
    #[Response(
        status: 500,
        description: 'An unexpected error occurred while updating menu items order.',
    )]
    public function updateMenuItemsOrder(
        UpdateMenuItemsOrderRequest $request
    ): JsonResponse {
        $data = $request->validated();

        try {
            $menuItems = [];

            foreach ($data as $menuItemData) {
                $menuItem = MenuItem::query()->findOrFail($menuItemData['id']);

                Gate::authorize('update', $menuItem);

                $menuItem->order = $menuItemData['order'];
                $menuItems[] = $menuItem;
            }

            $updatedMenuItems = $this->menuItemService->updateMenuItemsOrder($menuItems);

            return MenuItemResource::collection($updatedMenuItems)
                ->additional([
                    'success' => true,
                    'message' => 'Menu items order updated successfully.',
                ])
                ->response();
        } catch (ModelNotFoundException) {
            return response()->json([
                'success' => false,
                'message' => 'Menu item not found.',
            ], 404);
        } catch (Throwable) {
            return response()->json([
                'success' => false,
                'message' => 'Could not update menu items.',
            ], 500);
        }
    }

    /**
     * Delete a menu item.
     */
    #[Endpoint(
        operationId: 'deletePartnerMenuItem',
        title: 'Delete menu item',
        description: 'Delete a menu item.',
        method: 'DELETE'
    )]
    #[Response(
        status: 200,
        description: 'Menu item deleted successfully.',
    )]
    #[Response(
        status: 500,
        description: 'An unexpected error occurred while deleting menu item.',
    )]
    public function deleteMenuItem(MenuItem $menuItem): JsonResponse
    {
        Gate::authorize('delete', $menuItem);

        try {
            $this->menuItemService->deleteMenuItem($menuItem);

            return response()->json([
                'success' => true,
                'message' => 'Menu item deleted successfully.',
            ], 200);
        } catch (Throwable) {
            return response()->json([
                'success' => false,
                'message' => 'Could not delete menu item.',
            ], 500);
        }
    }
}
