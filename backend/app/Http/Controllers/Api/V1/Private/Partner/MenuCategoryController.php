<?php

declare(strict_types=1);

namespace App\Http\Controllers\Api\V1\Private\Partner;

use App\Exceptions\Private\Partner\MenuCategoryOrderExceededException;
use App\Http\Controllers\Controller;
use App\Http\Requests\Api\V1\Private\Partner\Menu\MenuCategory\CreateMenuCategoryRequest;
use App\Http\Requests\Api\V1\Private\Partner\Menu\MenuCategory\UpdateMenuCategoriesOrderRequest;
use App\Http\Requests\Api\V1\Private\Partner\Menu\MenuCategory\UpdateMenuCategoryRequest;
use App\Http\Resources\Api\V1\MenuCategory\MenuCategoryResource;
use App\Models\MenuCategory;
use App\Models\Restaurant;
use App\Services\Private\Partner\MenuCategoryService;
use Dedoc\Scramble\Attributes\Endpoint;
use Dedoc\Scramble\Attributes\Group;
use Dedoc\Scramble\Attributes\IgnoreResponse;
use Dedoc\Scramble\Attributes\Response;
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
    #[Endpoint(
        operationId: 'createPartnerMenuCategory',
        title: 'Create menu category',
        description: 'Create a new menu category for a restaurant.',
        method: 'POST'
    )]
    #[IgnoreResponse(200)]
    #[Response(
        status: 201,
        description: 'Menu category created successfully.',
    )]
    #[Response(
        status: 400,
        description: 'Menu category order exceeded.',
    )]
    #[Response(
        status: 500,
        description: 'An unexpected error occurred while creating menu category.',
    )]
    public function createMenuCategory(
        CreateMenuCategoryRequest $request,
        Restaurant $restaurant
    ): JsonResponse {
        Gate::authorize('create', [MenuCategory::class, $restaurant]);

        try {
            $menuCategory = $this->menuCategoryService->createMenuCategory(
                $request->validated(),
                $restaurant
            );

            return MenuCategoryResource::make($menuCategory)
                ->additional([
                    'success' => true,
                    'message' => 'Menu category created successfully.',
                ])
                ->response()
                ->setStatusCode(201);
        } catch (MenuCategoryOrderExceededException $e) {
            return response()->json([
                'success' => false,
                'message' => $e->getMessage(),
            ], 422);
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
    #[Endpoint(
        operationId: 'updatePartnerMenuCategoriesOrder',
        title: 'Update menu categories order',
        description: 'Update the display order of menu categories.',
        method: 'PUT'
    )]
    #[Response(
        status: 200,
        description: 'Menu categories order updated successfully.',
    )]
    #[Response(
        status: 404,
        description: 'Menu category not found.',
    )]
    #[Response(
        status: 500,
        description: 'An unexpected error occurred while updating menu categories order.',
    )]
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

            return MenuCategoryResource::collection($updatedMenuCategories)
                ->additional([
                    'success' => true,
                    'message' => 'Menu categories order updated successfully.',
                ])
                ->response();
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
    #[Endpoint(
        operationId: 'updatePartnerMenuCategory',
        title: 'Update menu category',
        description: 'Update an existing menu category.',
        method: 'PUT'
    )]
    #[Response(
        status: 200,
        description: 'Menu category updated successfully.',
    )]
    #[Response(
        status: 500,
        description: 'An unexpected error occurred while updating menu category.',
    )]
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

            return MenuCategoryResource::make($menuCategory)
                ->additional([
                    'success' => true,
                    'message' => 'Menu category updated successfully.',
                ])
                ->response();
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
    #[Endpoint(
        operationId: 'deletePartnerMenuCategory',
        title: 'Delete menu category',
        description: 'Delete a menu category.',
        method: 'DELETE'
    )]
    #[Response(
        status: 200,
        description: 'Menu category deleted successfully.',
    )]
    #[Response(
        status: 500,
        description: 'An unexpected error occurred while deleting menu category.',
    )]
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
