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
use Dedoc\Scramble\Attributes\Group;
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
                'success' => true,
                'message' => 'Menu item created successfully.',
                'menu_item' => $menuItem,
            ], 201);
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
                'success' => true,
                'message' => 'Menu item updated successfully.',
                'menu_item' => $menuItem,
            ], 200);
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
                'success' => true,
                'message' => 'Order updated successfully.',
                'menu_items' => $updatedMenuItems,
            ], 200);
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
