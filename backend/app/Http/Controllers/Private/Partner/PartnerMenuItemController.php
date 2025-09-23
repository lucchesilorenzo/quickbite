<?php

declare(strict_types=1);

namespace App\Http\Controllers\Private\Partner;

use App\Http\Controllers\Controller;
use App\Http\Requests\Private\Partner\Menu\MenuItems\CreateRestaurantMenuItemRequest;
use App\Http\Requests\Private\Partner\Menu\MenuItems\UpdateRestaurantMenuItemRequest;
use App\Http\Requests\Private\Partner\Menu\MenuItems\UpdateRestaurantMenuItemsOrderRequest;
use App\Models\MenuCategory;
use App\Models\MenuItem;
use App\Services\Private\Partner\PartnerMenuItemService;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Gate;
use Throwable;

class PartnerMenuItemController extends Controller
{
    public function __construct(
        private readonly PartnerMenuItemService $partnerMenuItemService
    ) {}

    /**
     * Create a partner's restaurant menu item.
     */
    public function createRestaurantMenuItem(
        CreateRestaurantMenuItemRequest $request,
        MenuCategory $menuCategory
    ): JsonResponse {
        Gate::authorize('createMenuItem', $menuCategory);

        try {
            $image = $request->hasFile('image') ? $request->file('image') : null;

            $menuItem = $this->partnerMenuItemService->createMenuItem(
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
    public function updateRestaurantMenuItem(
        UpdateRestaurantMenuItemRequest $request,
        MenuItem $menuItem
    ): JsonResponse {
        Gate::authorize('update', $menuItem);

        try {
            $image = $request->hasFile('image') ? $request->file('image') : null;

            $menuItem = $this->partnerMenuItemService->updateMenuItem(
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
    public function updateRestaurantMenuItemsOrder(
        UpdateRestaurantMenuItemsOrderRequest $request
    ): JsonResponse {
        $data = $request->validated();

        try {
            $menuItems = [];

            foreach ($data as $menuItemData) {
                $menuItem = MenuItem::findOrFail($menuItemData['id']);

                Gate::authorize('update', $menuItem);

                $menuItem->order = $menuItemData['order'];
                $menuItems[] = $menuItem;
            }

            $updatedMenuItems = $this->partnerMenuItemService->updateMenuItemsOrder($menuItems);

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
    public function deleteRestaurantMenuItem(MenuItem $menuItem): JsonResponse
    {
        Gate::authorize('delete', $menuItem);

        try {
            $this->partnerMenuItemService->deleteMenuItem($menuItem);

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
