<?php

declare(strict_types=1);

namespace App\Http\Controllers\Private\Partner;

use App\Http\Controllers\Controller;
use App\Http\Requests\Private\Partner\Menu\MenuItems\CreateMenuItemRequest;
use App\Http\Requests\Private\Partner\Menu\MenuItems\UpdateMenuItemRequest;
use App\Http\Requests\Private\Partner\Menu\MenuItems\UpdateMenuItemsOrderRequest;
use App\Models\MenuCategory;
use App\Models\MenuItem;
use App\Services\Private\Partner\MenuItemService;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Gate;
use Throwable;

class MenuItemController extends Controller
{
    public function __construct(
        private readonly MenuItemService $menuItemService
    ) {}

    /**
     * Create a partner's restaurant menu item.
     */
    public function createMenuItem(
        CreateMenuItemRequest $request,
        MenuCategory $menuCategory
    ): JsonResponse {
        Gate::authorize('createPartnerMenuItem', $menuCategory);

        try {
            $image = $request->hasFile('image') ? $request->file('image') : null;

            $menuItem = $this->menuItemService->createMenuItem(
                $request->validated(),
                $menuCategory,
                $image
            );

            return response()->json([
                'menu_item' => $menuItem,
                'message' => 'Menu item created successfully.',
            ], 201);
        } catch (Throwable) {
            return response()->json([
                'message' => 'Could not create menu item.',
            ], 500);
        }
    }

    /**
     * Update a partner's restaurant menu item.
     */
    public function updateMenuItem(
        UpdateMenuItemRequest $request,
        MenuItem $menuItem
    ): JsonResponse {
        Gate::authorize('update', $menuItem);

        try {
            $image = $request->hasFile('image') ? $request->file('image') : null;

            $menuItem = $this->menuItemService->updateMenuItem(
                $request->validated(),
                $menuItem,
                $image,
            );

            return response()->json([
                'menu_item' => $menuItem,
                'message' => 'Menu item updated successfully.',
            ], 200);
        } catch (Throwable) {
            return response()->json([
                'message' => 'Could not update menu item.',
            ], 500);
        }
    }

    /**
     * Update a partner's restaurant menu items order.
     */
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

            return response()->json([
                'menu_items' => $updatedMenuItems,
                'message' => 'Order updated successfully.',
            ], 200);
        } catch (ModelNotFoundException) {
            return response()->json([
                'message' => 'Menu item not found.',
            ], 404);
        } catch (Throwable) {
            return response()->json([
                'message' => 'Could not update menu items.',
            ], 500);
        }
    }

    /**
     * Delete a partner's restaurant menu item.
     */
    public function deleteMenuItem(MenuItem $menuItem): JsonResponse
    {
        Gate::authorize('delete', $menuItem);

        try {
            $this->menuItemService->deleteMenuItem($menuItem);

            return response()->json([
                'message' => 'Menu item deleted successfully.',
            ], 200);
        } catch (Throwable) {
            return response()->json([
                'message' => 'Could not delete menu item.',
            ], 500);
        }
    }
}
