<?php

declare(strict_types=1);

namespace App\Http\Controllers\Private\Partner;

use App\Exceptions\Private\Partner\MenuCategoryOrderExceededException;
use App\Http\Controllers\Controller;
use App\Http\Requests\Private\Partner\Menu\MenuCategory\CreateMenuCategoryRequest;
use App\Http\Requests\Private\Partner\Menu\MenuCategory\UpdateMenuCategoriesOrderRequest;
use App\Http\Requests\Private\Partner\Menu\MenuCategory\UpdateMenuCategoryRequest;
use App\Models\MenuCategory;
use App\Models\Restaurant;
use App\Services\Private\Partner\MenuCategoryService;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Gate;
use Throwable;

class MenuCategoryController extends Controller
{
    public function __construct(
        private readonly MenuCategoryService $menuCategoryService
    ) {}

    /**
     * Create a partner's restaurant menu category.
     */
    public function createMenuCategory(
        CreateMenuCategoryRequest $request,
        Restaurant $restaurant
    ): JsonResponse {
        Gate::authorize('createPartnerMenuCategory', $restaurant);

        try {
            $menuCategory = $this->menuCategoryService->createMenuCategory(
                $request->validated(),
                $restaurant
            );

            return response()->json([
                'menu_category' => $menuCategory,
                'message' => 'Menu category created successfully.',
            ], 200);
        } catch (MenuCategoryOrderExceededException $e) {
            return response()->json([
                'message' => $e->getMessage(),
            ], $e->getCode());
        } catch (Throwable) {
            return response()->json([
                'message' => 'Could not create menu category.',
            ], 500);
        }
    }

    /**
     * Update a partner's restaurant menu categories order.
     */
    public function updateMenuCategoriesOrder(
        UpdateMenuCategoriesOrderRequest $request
    ): JsonResponse {
        $data = $request->validated();

        try {
            $menuCategories = [];

            foreach ($data as $menuCategoryData) {
                $menuCategory = MenuCategory::query()->findOrFail($menuCategoryData['id']);

                Gate::authorize('update', $menuCategory);

                $menuCategory->order = $menuCategoryData['order'];
                $menuCategories[] = $menuCategory;
            }

            $updatedMenuCategories = $this->menuCategoryService->updateMenuCategoriesOrder($menuCategories);

            return response()->json([
                'menu_categories' => $updatedMenuCategories,
                'message' => 'Order updated successfully.',
            ], 200);
        } catch (ModelNotFoundException) {
            return response()->json([
                'message' => 'Menu category not found.',
            ], 404);
        } catch (Throwable) {
            return response()->json([
                'message' => 'Could not update menu categories.',
            ], 500);
        }
    }

    /**
     * Update a partner's restaurant menu category.
     */
    public function updateMenuCategory(
        UpdateMenuCategoryRequest $request,
        MenuCategory $menuCategory
    ): JsonResponse {
        Gate::authorize('update', $menuCategory);

        try {
            $menuCategory = $this->menuCategoryService->updateMenuCategory(
                $request->validated(),
                $menuCategory
            );

            return response()->json([
                'menu_category' => $menuCategory,
                'message' => 'Menu category updated successfully.',
            ], 200);
        } catch (Throwable) {
            return response()->json([
                'message' => 'Could not update menu category.',
            ], 500);
        }
    }

    /**
     * Delete a partner's restaurant menu category.
     */
    public function deleteMenuCategory(MenuCategory $menuCategory): JsonResponse
    {
        Gate::authorize('delete', $menuCategory);

        try {
            $this->menuCategoryService->deleteMenuCategory($menuCategory);

            return response()->json([
                'message' => 'Menu category deleted successfully.',
            ], 200);
        } catch (Throwable) {
            return response()->json([
                'message' => 'Could not delete menu category.',
            ], 500);
        }
    }
}
