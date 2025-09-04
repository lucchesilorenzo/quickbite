<?php

declare(strict_types=1);

namespace App\Http\Controllers\Partner;

use App\Http\Controllers\Controller;
use App\Http\Requests\Partner\CreateRestaurantMenuCategoryRequest;
use App\Http\Requests\Partner\UpdateRestaurantMenuCategoriesOrderRequest;
use App\Http\Requests\Partner\UpdateRestaurantMenuCategoryRequest;
use App\Models\MenuCategory;
use App\Models\Restaurant;
use App\Services\Partner\PartnerMenuCategoryService;
use Exception;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Gate;
use Throwable;

class PartnerMenuCategoryController extends Controller
{
    public function __construct(private PartnerMenuCategoryService $partnerMenuCategoryService) {}

    /**
     * Create a partner's restaurant menu category.
     */
    public function createRestaurantMenuCategory(
        Restaurant $restaurant,
        CreateRestaurantMenuCategoryRequest $request
    ): JsonResponse {
        Gate::authorize('createMenuCategory', $restaurant);

        $data = $request->validated();

        try {
            $menuCategory = $this->partnerMenuCategoryService->createMenuCategory($restaurant, $data);

            return response()->json([
                'menuCategory' => $menuCategory,
                'message' => 'Menu category created successfully.',
            ], 200);
        } catch (Exception $e) {
            return response()->json([
                'message' => $e->getMessage(),
            ], $e->getCode());
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
        $data = $request->validated();

        try {
            $menuCategories = [];

            foreach ($data as $menuCategoryData) {
                $menuCategory = MenuCategory::findOrFail($menuCategoryData['id']);

                Gate::authorize('update', $menuCategory);

                $menuCategory->order = $menuCategoryData['order'];
                $menuCategories[] = $menuCategory;
            }

            $updatedMenuCategories = $this->partnerMenuCategoryService->updateMenuCategoriesOrder($menuCategories);

            return response()->json([
                'menuCategories' => $updatedMenuCategories,
                'message' => 'Order updated successfully.',
            ], 200);
        } catch (ModelNotFoundException $e) {
            return response()->json([
                'message' => 'Menu category not found.',
            ], 404);
        } catch (Exception $e) {
            return response()->json([
                'message' => $e->getMessage(),
            ], $e->getCode());
        } catch (Throwable $e) {
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
        Gate::authorize('update', $menuCategory);

        $data = $request->validated();

        try {
            $menuCategory->update($data);

            return response()->json([
                'menuCategory' => $menuCategory,
                'message' => 'Menu category updated successfully.',
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
        Gate::authorize('delete', $menuCategory);

        try {
            $this->partnerMenuCategoryService->deleteMenuCategory($menuCategory);

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
