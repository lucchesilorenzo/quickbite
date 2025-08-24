<?php

declare(strict_types=1);

namespace App\Http\Controllers\Partner;

use App\Http\Controllers\Controller;
use App\Http\Requests\Partner\CreateRestaurantMenuCategoryRequest;
use App\Http\Requests\Partner\UpdateRestaurantMenuCategoriesOrderRequest;
use App\Http\Requests\Partner\UpdateRestaurantMenuCategoryRequest;
use App\Models\MenuCategory;
use App\Models\Restaurant;
use Exception;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Gate;
use Throwable;

class PartnerMenuCategoryController extends Controller
{
    /**
     * Create a partner's restaurant menu category.
     */
    public function createRestaurantMenuCategory(
        Restaurant $restaurant,
        CreateRestaurantMenuCategoryRequest $request
    ): JsonResponse {
        // Check if user is authorized
        Gate::authorize('createMenuCategory', $restaurant);

        // Get validated data
        $data = $request->validated();

        try {
            // Get menu category order
            $menuCategoryOrder = $restaurant->menuCategories()->max('order');

            if ($menuCategoryOrder === 8) {
                return response()->json([
                    'message' => 'You have reached the maximum number of menu categories.',
                ], 422);
            }

            $data['order'] = is_null($menuCategoryOrder) ? 0 : $menuCategoryOrder + 1;

            // Create menu category
            $menuCategory = $restaurant->menuCategories()->create([
                ...$data,
                'order' => $data['order'],
            ]);

            return response()->json([
                'message' => 'Menu category created successfully.',
                'menuCategory' => $menuCategory,
            ], 200);
        } catch (Throwable $e) {
            if ($e->getCode() === '23505') {
                return response()->json([
                    'message' => 'Menu category with the same name already exists.',
                ], 422);
            }

            return response()->json([
                'message' => 'Could not create menu category.',
            ], 500);
        }
    }

    /**
     * Update a partner's restaurant menu categories order.
     */
    public function updateRestaurantMenuCategoriesOrder(
        UpdateRestaurantMenuCategoriesOrderRequest $request
    ): JsonResponse {
        // Get validated data
        $data = $request->validated();

        try {
            $updatedMenuCategories = DB::transaction(function () use ($data) {
                $updatedCategories = [];

                foreach ($data as $menuCategoryData) {
                    $menuCategory = MenuCategory::find($menuCategoryData['id']);

                    if (! $menuCategory) {
                        throw new Exception('Menu category not found.', 404);
                    }

                    Gate::authorize('update', $menuCategory);

                    $menuCategory->update([
                        'order' => $menuCategoryData['order'],
                    ]);

                    $updatedCategories[] = $menuCategory;
                }

                return $updatedCategories;
            });

            return response()->json([
                'message' => 'Order updated successfully.',
                'menuCategories' => $updatedMenuCategories,
            ], 200);
        } catch (Throwable $e) {
            if ($e->getMessage() === 'Menu category not found.') {
                return response()->json([
                    'message' => $e->getMessage(),
                ], 404);
            }

            if ($e->getCode() === '23505') {
                return response()->json([
                    'message' => 'Menu category with the same name already exists.',
                ], 422);
            }

            return response()->json([
                'message' => 'Could not update menu categories.',
            ], 500);
        }
    }

    /**
     * Update a partner's restaurant menu category.
     */
    public function updateRestaurantMenuCategory(
        MenuCategory $menuCategory,
        UpdateRestaurantMenuCategoryRequest $request
    ): JsonResponse {
        // Check if user is authorized
        Gate::authorize('update', $menuCategory);

        // Get validated data
        $data = $request->validated();

        try {
            // Update menu category
            $menuCategory->update($data);

            return response()->json([
                'message' => 'Menu category updated successfully.',
                'menuCategory' => $menuCategory,
            ], 200);
        } catch (Throwable $e) {
            if ($e->getCode() === '23505') {
                return response()->json([
                    'message' => 'Menu category with the same name already exists.',
                ], 422);
            }

            return response()->json([
                'message' => 'Could not update menu category.',
            ], 500);
        }
    }

    /**
     * Delete a partner's restaurant menu category.
     */
    public function deleteRestaurantMenuCategory(MenuCategory $menuCategory): JsonResponse
    {
        // Check if user is authorized
        Gate::authorize('delete', $menuCategory);

        try {
            // Delete menu category
            $menuCategory->delete();

            // Decrement menu categories order
            MenuCategory::where('restaurant_id', $menuCategory->restaurant_id)
                ->where('order', '>', $menuCategory->order)
                ->decrement('order');

            return response()->json([
                'message' => 'Menu category deleted successfully.',
            ], 200);
        } catch (Throwable $e) {
            return response()->json([
                'message' => 'Could not delete menu category.',
            ], 500);
        }
    }
}
