<?php

declare(strict_types=1);

namespace App\Http\Controllers\Partner;

use App\Http\Controllers\Controller;
use App\Http\Requests\Partner\CreateRestaurantMenuItemRequest;
use App\Http\Requests\Partner\UpdateRestaurantMenuItemRequest;
use App\Http\Requests\Partner\UpdateRestaurantMenuItemsOrderRequest;
use App\Models\MenuCategory;
use App\Models\MenuItem;
use Exception;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Gate;
use Illuminate\Support\Facades\Storage;
use Throwable;

class PartnerMenuItemController extends Controller
{
    /**
     * Create a partner's restaurant menu item.
     */
    public function createRestaurantMenuItem(
        MenuCategory $menuCategory,
        CreateRestaurantMenuItemRequest $request
    ): JsonResponse {
        // Check if user is authorized
        Gate::authorize('createMenuItem', $menuCategory);

        // Get validated data
        $data = $request->validated();

        try {
            if ($request->hasFile('image')) {
                $path = $request->file('image')->store('restaurants/menu-items', 'public');
                $data['image'] = '/storage/' . $path;
            }

            // Get menu item order
            $menuItemOrder = $menuCategory->menuItems()->max('order');

            $data['order'] = is_null($menuItemOrder) ? 0 : $menuItemOrder + 1;

            // Create menu item
            $menuItem = MenuItem::create([
                ...$data,
                'menu_category_id' => $menuCategory->id,
                'order' => $data['order'],
            ]);

            return response()->json([
                'message' => 'Menu item created successfully.',
                'menuItem' => $menuItem,
            ], 200);
        } catch (Throwable $e) {
            if ($e->getCode() === '23505') {
                return response()->json([
                    'message' => 'Menu item with the same name already exists.',
                ], 422);
            }

            return response()->json([
                'message' => 'Could not create menu item.',
            ], 500);
        }
    }

    /**
     * Update a partner's restaurant menu item.
     */
    public function updateRestaurantMenuItem(
        MenuItem $menuItem,
        UpdateRestaurantMenuItemRequest $request
    ): JsonResponse {
        // Check if user is authorized
        Gate::authorize('update', $menuItem);

        // Get validated data
        $data = $request->validated();

        try {
            if ($request->hasFile('image')) {
                if ($menuItem->image && ! str_contains($menuItem->image, 'menu-items/default')) {
                    $oldImagePath = str_replace('/storage/', '', $menuItem->image);

                    if (Storage::disk('public')->exists($oldImagePath)) {
                        Storage::disk('public')->delete($oldImagePath);
                    }
                }

                $path = $request->file('image')->store('restaurants/menu-items', 'public');
                $data['image'] = '/storage/' . $path;
            }

            // Update menu item
            $menuItem->update($data);

            return response()->json([
                'message' => 'Menu item updated successfully.',
                'menuItem' => $menuItem,
            ], 200);
        } catch (Throwable $e) {
            if ($e->getCode() === '23505') {
                return response()->json([
                    'message' => 'Menu item with the same name already exists.',
                ], 422);
            }

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
        // Get validated data
        $data = $request->validated();

        try {
            $updatedMenuItems = DB::transaction(function () use ($data) {
                $updatedMenuItems = [];

                foreach ($data as $menuItemData) {
                    $menuItem = MenuItem::find($menuItemData['id']);

                    if (! $menuItem) {
                        throw new Exception('Menu item not found.', 404);
                    }

                    Gate::authorize('update', $menuItem);

                    $menuItem->update([
                        'order' => $menuItemData['order'],
                    ]);

                    $updatedMenuItems[] = $menuItem;
                }

                return $updatedMenuItems;
            });

            return response()->json([
                'message' => 'Order updated successfully.',
                'menuItems' => $updatedMenuItems,
            ], 200);
        } catch (Throwable $e) {
            if ($e->getMessage() === 'Menu item not found.') {
                return response()->json([
                    'message' => $e->getMessage(),
                ], 404);
            }

            if ($e->getCode() === '23505') {
                return response()->json([
                    'message' => 'Menu item with the same name already exists.',
                ], 422);
            }

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
        // Check if user is authorized
        Gate::authorize('delete', $menuItem);

        try {
            if ($menuItem->image && ! str_contains($menuItem->image, 'menu-items/default')) {
                $oldImagePath = str_replace('/storage/', '', $menuItem->image);

                if (Storage::disk('public')->exists($oldImagePath)) {
                    Storage::disk('public')->delete($oldImagePath);
                }
            }

            // Delete menu item
            $menuItem->delete();

            // Decrement menu items order
            MenuItem::where('menu_category_id', $menuItem->menu_category_id)
                ->where('order', '>', $menuItem->order)
                ->decrement('order');

            return response()->json([
                'message' => 'Menu item deleted successfully.',
            ], 200);
        } catch (Throwable $e) {
            return response()->json([
                'message' => 'Could not delete menu item.',
            ], 500);
        }
    }
}
