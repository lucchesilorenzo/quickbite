<?php

declare(strict_types=1);

namespace App\Http\Controllers\Partner;

use App\Http\Controllers\Controller;
use App\Http\Requests\Partner\CreateRestaurantMenuCategoryRequest;
use App\Http\Requests\Partner\CreateRestaurantMenuItemRequest;
use App\Http\Requests\Partner\UpdateRestaurantDeliveryTimesRequest;
use App\Http\Requests\Partner\UpdateRestaurantFeesRequest;
use App\Http\Requests\Partner\UpdateRestaurantInfoRequest;
use App\Http\Requests\Partner\UpdateRestaurantMenuCategoriesOrderRequest;
use App\Http\Requests\Partner\UpdateRestaurantMenuCategoryRequest;
use App\Http\Requests\Partner\UpdateRestaurantMenuItemRequest;
use App\Http\Requests\Partner\UpdateRestaurantMenuItemsOrderRequest;
use App\Http\Requests\Partner\UpdateRestaurantStatusRequest;
use App\Models\MenuCategory;
use App\Models\MenuItem;
use App\Models\Restaurant;
use App\Services\LocationService;
use Exception;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Gate;
use Illuminate\Support\Facades\Storage;
use Throwable;

class PartnerRestaurantController extends Controller
{
    /**
     * Create a new controller instance.
     */
    public function __construct(private LocationService $locationService) {}

    /**
     * Get partner's restaurants.
     */
    public function getRestaurants(): JsonResponse
    {
        try {
            $user = auth()->user();

            $restaurants = $user->restaurants()
                ->with([
                    'categories',
                    'deliveryDays' => function ($query) {
                        $query->orderBy('order', 'asc');
                    },
                    'reviews' => function ($query) {
                        $query->orderBy('created_at', 'desc');
                    },
                    'reviews.customer',
                    'reviews.order',
                    'menuCategories' => function ($query) {
                        $query->orderBy('order', 'asc')
                            ->with('menuItems', function ($query) {
                                $query->orderBy('order', 'asc');
                            });
                    },
                ])
                ->withAvg('reviews', 'rating')
                ->withCount('reviews')
                ->get();

            if ($restaurants->isEmpty()) {
                return response()->json([
                    'message' => 'No restaurants found.',
                ], 404);
            }

            return response()->json($restaurants, 200);
        } catch (Throwable $e) {
            return response()->json([
                'message' => 'Could not get restaurants.',
            ], 500);
        }
    }

    /**
     * Get a partner's restaurant.
     */
    public function getRestaurant(Restaurant $restaurant): JsonResponse
    {
        // Check if user is authorized
        Gate::authorize('viewPartnerRestaurant', $restaurant);

        try {
            $user = auth()->user();

            $restaurant = $user->restaurants()
                ->where('id', $restaurant->id)
                ->with([
                    'categories',
                    'deliveryDays' => function ($query) {
                        $query->orderBy('order', 'asc');
                    },
                    'reviews' => function ($query) {
                        $query->orderBy('created_at', 'desc');
                    },
                    'reviews.customer',
                    'reviews.order',
                    'menuCategories' => function ($query) {
                        $query->orderBy('order', 'asc')
                            ->with('menuItems', function ($query) {
                                $query->orderBy('order', 'asc');
                            });
                    },
                ])
                ->withAvg('reviews', 'rating')
                ->withCount('reviews')
                ->first();

            return response()->json($restaurant, 200);
        } catch (Throwable $e) {
            return response()->json([
                'message' => 'Could not get restaurant.',
            ], 500);
        }
    }

    /**
     * Update a partner's restaurant status.
     */
    public function updateRestaurantStatus(
        Restaurant $restaurant,
        UpdateRestaurantStatusRequest $request
    ): JsonResponse {
        // Check if user is authorized
        Gate::authorize('update', $restaurant);

        // Get validated data
        $data = $request->validated();

        try {
            $restaurant->update([
                'force_close' => $data['force_close'],
            ]);

            return response()->json([
                'message' => 'Restaurant status updated successfully.',
                'restaurant' => $restaurant,
            ], 200);
        } catch (Throwable $e) {
            return response()->json([
                'message' => 'Could not update restaurant status.',
            ], 500);
        }
    }

    /**
     * Update a partner's restaurant fees.
     */
    public function updateRestaurantFees(
        Restaurant $restaurant,
        UpdateRestaurantFeesRequest $request
    ): JsonResponse {
        // Check if user is authorized
        Gate::authorize('update', $restaurant);

        // Get validated data
        $data = $request->validated();

        try {
            $restaurant->update($data);

            return response()->json([
                'message' => 'Restaurant fees updated successfully.',
                'restaurant' => $restaurant,
            ], 200);
        } catch (Throwable $e) {
            return response()->json([
                'message' => 'Could not update restaurant fees.',
            ], 500);
        }
    }

    /**
     * Update a partner's restaurant delivery times.
     */
    public function updateRestaurantDeliveryTimes(
        Restaurant $restaurant,
        UpdateRestaurantDeliveryTimesRequest $request
    ): JsonResponse {
        // Check if user is authorized
        Gate::authorize('update', $restaurant);

        // Get validated data
        $data = $request->validated();

        try {
            // Update delivery days
            foreach ($data['delivery_days'] as $deliveryDay) {
                $restaurant->deliveryDays()
                    ->where('day', $deliveryDay['day'])
                    ->update([
                        'start_time' => $deliveryDay['start_time'],
                        'end_time' => $deliveryDay['end_time'],
                    ]);
            }

            return response()->json([
                'message' => 'Restaurant delivery times updated successfully.',
                'restaurant' => $restaurant,
            ], 200);
        } catch (Throwable $e) {
            return response()->json([
                'message' => 'Could not update restaurant delivery times.',
            ], 500);
        }
    }

    /**
     * Update a partner's restaurant info.
     */
    public function updateRestaurantInfo(
        Restaurant $restaurant,
        UpdateRestaurantInfoRequest $request
    ): JsonResponse {
        // Check if user is authorized
        Gate::authorize('update', $restaurant);

        // Get validated data
        $data = $request->validated();

        try {
            if ($request->hasFile('logo')) {
                if ($restaurant->logo && ! str_contains($restaurant->image, 'logos/default')) {
                    $oldLogoPath = str_replace('/storage/', '', $restaurant->logo);

                    if (Storage::disk('public')->exists($oldLogoPath)) {
                        Storage::disk('public')->delete($oldLogoPath);
                    }
                }

                $path = $request->file('logo')->store('restaurants/logos', 'public');
                $data['logo'] = '/storage/' . $path;
            }

            if ($request->hasFile('cover')) {
                if ($restaurant->cover && ! str_contains($restaurant->image, 'covers/default')) {
                    $oldCoverPath = str_replace('/storage/', '', $restaurant->cover);

                    if (Storage::disk('public')->exists($oldCoverPath)) {
                        Storage::disk('public')->delete($oldCoverPath);
                    }
                }

                $path = $request->file('cover')->store('restaurants/covers', 'public');
                $data['cover'] = '/storage/' . $path;
            }

            // Get location
            $locationData = $this->locationService->getLocationData($data);

            if (! $locationData) {
                throw new Exception('Location not found.');
            }

            // Update restaurant info
            $restaurant->update([
                ...$data,
                'latitude' => $locationData['lat'],
                'longitude' => $locationData['lon'],
            ]);

            // Create or update restaurant categories
            $restaurant->categories()->sync($data['categories']);

            return response()->json([
                'message' => 'Restaurant info updated successfully.',
                'restaurant' => $restaurant,
            ], 200);
        } catch (Throwable $e) {
            if ($e->getMessage() === 'Location not found.') {
                return response()->json([
                    'message' => $e->getMessage(),
                ], 404);
            }

            return response()->json([
                'message' => 'Could not update restaurant info.',
            ], 500);
        }
    }

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
