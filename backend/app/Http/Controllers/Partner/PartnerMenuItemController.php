<?php

declare(strict_types=1);

namespace App\Http\Controllers\Partner;

use App\Http\Controllers\Controller;
use App\Http\Requests\Partner\CreateRestaurantMenuItemRequest;
use App\Http\Requests\Partner\UpdateRestaurantMenuItemRequest;
use App\Http\Requests\Partner\UpdateRestaurantMenuItemsOrderRequest;
use App\Models\MenuCategory;
use App\Models\MenuItem;
use App\Services\Partner\PartnerMenuItemService;
use Exception;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Gate;
use Illuminate\Support\Facades\Storage;
use Throwable;

class PartnerMenuItemController extends Controller
{
    public function __construct(private PartnerMenuItemService $menuItemService) {}

    /**
     * Create a partner's restaurant menu item.
     */
    public function createRestaurantMenuItem(
        MenuCategory $menuCategory,
        CreateRestaurantMenuItemRequest $request
    ): JsonResponse {
        Gate::authorize('createMenuItem', $menuCategory);

        $data = $request->validated();

        try {
            $image = $request->hasFile('image') ? $request->file('image') : null;

            $menuItem = $this->menuItemService->createMenuItem(
                $menuCategory,
                $image,
                $data
            );

            return response()->json([
                'menuItem' => $menuItem,
                'message' => 'Menu item created successfully.',
            ], 201);
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
        Gate::authorize('update', $menuItem);

        $data = $request->validated();

        try {
            $image = $request->hasFile('image') ? $request->file('image') : null;

            $menuItem = $this->menuItemService->updateMenuItem(
                $menuItem,
                $image,
                $data
            );

            return response()->json([
                'menuItem' => $menuItem,
                'message' => 'Menu item updated successfully.',
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
