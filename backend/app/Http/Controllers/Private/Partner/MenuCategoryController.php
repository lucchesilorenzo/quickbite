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
use Dedoc\Scramble\Attributes\Group;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Gate;
use Throwable;

#[Group('Partner Menu Categories')]
class MenuCategoryController extends Controller
{
    public function __construct(
        private readonly MenuCategoryService $menuCategoryService
    ) {}

    /**
     * Create a menu category.
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
                'success' => true,
                'message' => 'Menu category created successfully.',
                'menu_category' => $menuCategory,
            ], 201);
        } catch (MenuCategoryOrderExceededException $e) {
            return response()->json([
                'success' => false,
                'message' => $e->getMessage(),
            ], $e->getCode());
        } catch (Throwable) {
            return response()->json([
                'success' => false,
                'message' => 'Could not create menu category.',
            ], 500);
        }
    }

    /**
     * Update menu categories order.
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
                'success' => true,
                'message' => 'Menu categories order updated successfully.',
                'menu_categories' => $updatedMenuCategories,
            ], 200);
        } catch (ModelNotFoundException) {
            return response()->json([
                'success' => false,
                'message' => 'Menu category not found.',
            ], 404);
        } catch (Throwable) {
            return response()->json([
                'success' => false,
                'message' => 'Could not update menu categories.',
            ], 500);
        }
    }

    /**
     * Update a menu category.
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
                'success' => true,
                'message' => 'Menu category updated successfully.',
                'menu_category' => $menuCategory,
            ], 200);
        } catch (Throwable) {
            return response()->json([
                'success' => false,
                'message' => 'Could not update menu category.',
            ], 500);
        }
    }

    /**
     * Delete a menu category.
     */
    public function deleteMenuCategory(MenuCategory $menuCategory): JsonResponse
    {
        Gate::authorize('delete', $menuCategory);

        try {
            $this->menuCategoryService->deleteMenuCategory($menuCategory);

            return response()->json([
                'success' => true,
                'message' => 'Menu category deleted successfully.',
            ], 200);
        } catch (Throwable) {
            return response()->json([
                'success' => false,
                'message' => 'Could not delete menu category.',
            ], 500);
        }
    }
}
