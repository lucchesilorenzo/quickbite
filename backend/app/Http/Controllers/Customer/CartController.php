<?php

namespace App\Http\Controllers\Customer;

use App\Http\Controllers\Controller;
use App\Http\Requests\Cart\CreateOrUpdateCartRequest;
use App\Models\Cart;
use Illuminate\Http\JsonResponse;

class CartController extends Controller
{
    /**
     * Get all carts for the authenticated user.
     *
     * @return JsonResponse
     */
    public function getCarts(): JsonResponse
    {
        try {
            $user = auth()->user();

            $carts = $user->carts()->with(['cartItems.menuItem'])->get();

            $formattedCarts = $carts->map(function ($cart) {
                return [
                    'id' => $cart->id,
                    'restaurant' => $cart->restaurant,
                    'total_items' => $cart->total_items,
                    'total_unique_items' => $cart->total_unique_items,
                    'cart_total' => $cart->cart_total,
                    'items' => $cart->cartItems->map(function ($item) {
                        return [
                            'id' => $item->menuItem->id,
                            'menu_category_id' => $item->menuItem->menu_category_id,
                            'name' => $item->menuItem->name,
                            'description' => $item->menuItem->description,
                            'price' => $item->menuItem->price,
                            'image' => $item->menuItem->image,
                            'is_available' => $item->menuItem->is_available,
                            'quantity' => $item->quantity,
                            'item_total' => $item->item_total,
                            'created_at' => $item->menuItem->created_at,
                            'updated_at' => $item->menuItem->updated_at,
                        ];
                    }),
                ];
            });

            return response()->json($formattedCarts, 200);
        } catch (\Throwable $e) {
            return response()->json([
                'message' => 'Could not get carts.',
            ], 500);
        }
    }

    /**
     * Get a cart for the authenticated user.
     *
     * @return JsonResponse
     */
    public function getCart(Cart $cart): JsonResponse
    {
        try {
            // Get user
            $user = auth()->user();

            if ($cart->user_id !== $user->id) {
                return response()->json([
                    'message' => 'You are not authorized to view this cart.',
                ], 403);
            }

            // Eager load cart items
            $cart->load('cartItems.menuItem');

            // Get restaurant
            $restaurant = $cart->restaurant()->with([
                'categories',
                'deliveryDays',
                'offers' => function ($query) {
                    $query->orderBy('discount_rate', 'asc');
                },
                'reviews' => function ($query) {
                    $query->orderBy('created_at', 'desc');
                },
                'reviews.customer',
                'menuCategories.menuItems',
            ])
                ->withAvg('reviews', 'rating')
                ->withCount('reviews')
                ->first();

            // Format cart
            $formattedCart = [
                'cart_id' => $cart->id,
                'restaurant_id' => $cart->restaurant_id,
                'restaurant' => $restaurant,
                'total_items' => $cart->total_items,
                'total_unique_items' => $cart->total_unique_items,
                'cart_total' => $cart->cart_total,
                'items' => $cart->cartItems->map(
                    fn($item) => [
                        'id' => $item->menuItem->id,
                        'menu_category_id' => $item->menuItem->menu_category_id,
                        'name' => $item->menuItem->name,
                        'description' => $item->menuItem->description,
                        'price' => $item->menuItem->price,
                        'image' => $item->menuItem->image,
                        'is_available' => $item->menuItem->is_available,
                        'quantity' => $item->quantity,
                        'item_total' => $item->item_total,
                        'created_at' => $item->menuItem->created_at,
                        'updated_at' => $item->menuItem->updated_at,
                    ]
                )
            ];

            return response()->json($formattedCart, 200);
        } catch (\Throwable $e) {
            return response()->json([
                'message' => 'Could not get cart.',
            ], 500);
        }
    }

    /**
     * Create or update multiple carts for the authenticated user.
     *
     * @param CreateOrUpdateCartsRequest $request
     * @return JsonResponse
     */
    public function createOrUpdateCarts(CreateOrUpdateCartsRequest $request): JsonResponse
    {
        $data = $request->validated();

        try {
            $user = auth()->user();

            foreach ($data as $cart) {
                $restaurantId = $cart['restaurant']['id'];

                // Get existing cart
                $existingCart = $user->carts()
                    ->where('restaurant_id', $restaurantId)
                    ->first();

                // Check if cart exists
                if (!$existingCart) {
                    $newCart = $user->carts()->create([
                        'restaurant_id' => $restaurantId,
                        'cart_total' => $cart['cart_total'],
                        'total_items' => $cart['total_items'],
                        'total_unique_items' => $cart['total_unique_items'],
                    ]);

                    // Create items
                    foreach ($cart['items'] as $item) {
                        $newCart->cartItems()->create([
                            'cart_id' => $newCart->id,
                            'menu_item_id' => $item['id'],
                            'quantity' => $item['quantity'],
                            'item_total' => $item['item_total'],
                        ]);
                    }
                } else {
                    // Merge items
                    foreach ($cart['items'] as $newItem) {
                        $existingItem = $existingCart->cartItems()
                            ->where('menu_item_id', $newItem['id'])
                            ->first();

                        // If item exists, update quantity; otherwise, create new item
                        if ($existingItem) {
                            $existingItem->update([
                                'quantity' => $existingItem->quantity + $newItem['quantity'],
                                'item_total' => ($existingItem->quantity + $newItem['quantity']) * $newItem['price'],
                            ]);
                        } else {
                            $existingCart->cartItems()->create([
                                'cart_id' => $existingCart->id,
                                'menu_item_id' => $newItem['id'],
                                'quantity' => $newItem['quantity'],
                                'item_total' => $newItem['item_total'],
                            ]);
                        }
                    }

                    // Update cart totals
                    $totalItems = $existingCart->cartItems->sum('quantity');
                    $totalUniqueItems = $existingCart->cartItems->count();
                    $total = $existingCart->cartItems->sum('item_total');

                    $existingCart->update([
                        'total_items' => $totalItems,
                        'total_unique_items' => $totalUniqueItems,
                        'cart_total' => $total,
                    ]);
                }
            }

            $carts = $user->carts()->with(['restaurant', 'cartItems.menuItem'])->get();

            $formattedCarts = $carts->map(function ($cart) {
                return [
                    'id' => $cart->id,
                    'restaurant' => $cart->restaurant,
                    'total_items' => $cart->total_items,
                    'total_unique_items' => $cart->total_unique_items,
                    'cart_total' => $cart->cart_total,
                    'items' => $cart->cartItems->map(function ($item) {
                        return [
                            'id' => $item->menuItem->id,
                            'menu_category_id' => $item->menuItem->menu_category_id,
                            'name' => $item->menuItem->name,
                            'description' => $item->menuItem->description,
                            'price' => $item->menuItem->price,
                            'image' => $item->menuItem->image,
                            'is_available' => $item->menuItem->is_available,
                            'quantity' => $item->quantity,
                            'item_total' => $item->item_total,
                            'created_at' => $item->menuItem->created_at,
                            'updated_at' => $item->menuItem->updated_at,
                        ];
                    }),
                ];
            });

            return response()->json([
                'message' => 'Carts merged successfully.',
                'carts' => $formattedCarts,
            ], 200);
        } catch (\Throwable $e) {
            return response()->json([
                'message' => 'Could not merge carts.',
            ], 500);
        }
    }

    /**
     * Create or update a cart for the authenticated user.
     *
     * @param CreateOrUpdateCartRequest $request
     * @return JsonResponse
     */
    public function createOrUpdateCart(CreateOrUpdateCartRequest $request): JsonResponse
    {
        // Get validated data
        $data = $request->validated();

        try {
            // Get user
            $user = auth()->user();

            // Update or create cart
            $cart = $user->carts()->updateOrCreate(
                ['restaurant_id' => $data['restaurant']['id']],
                [
                    'restaurant_id' => $data['restaurant']['id'],
                    'cart_total' => $data['cart_total'],
                    'total_items' => $data['total_items'],
                    'total_unique_items' => $data['total_unique_items'],
                ]
            );

            // Delete previous cart items
            $cart->cartItems()->delete();

            // Create cart items
            ['items' => $items] = $data;

            foreach ($items as $item) {
                $cart->cartItems()->create(
                    [
                        'menu_item_id' => $item['id'],
                        'quantity' => $item['quantity'],
                        'item_total' => $item['item_total'],
                    ]
                );
            }

            // Get updated cart
            $cart = $user->carts()->with(['cartItems.menuItem'])->where('restaurant_id', $data['restaurant']['id'])->first();

            // Check if cart exists
            if (!$cart) {
                return response()->json([
                    'message' => 'Cart not found.',
                ], 404);
            }

            // Get restaurant
            $restaurant = $cart->restaurant()->with([
                'categories',
                'deliveryDays',
                'offers' => function ($query) {
                    $query->orderBy('discount_rate', 'asc');
                },
                'reviews' => function ($query) {
                    $query->orderBy('created_at', 'desc');
                },
                'reviews.customer',
                'menuCategories.menuItems',
            ])
                ->withAvg('reviews', 'rating')
                ->withCount('reviews')
                ->first();

            // Format cart
            $formattedCart = [
                'cart_id' => $cart->id,
                'restaurant_id' => $cart->restaurant_id,
                'restaurant' => $restaurant,
                'total_items' => $cart->total_items,
                'total_unique_items' => $cart->total_unique_items,
                'cart_total' => $cart->cart_total,
                'items' => $cart->cartItems->map(
                    fn($item) => [
                        'id' => $item->menuItem->id,
                        'menu_category_id' => $item->menuItem->menu_category_id,
                        'name' => $item->menuItem->name,
                        'description' => $item->menuItem->description,
                        'price' => $item->menuItem->price,
                        'image' => $item->menuItem->image,
                        'is_available' => $item->menuItem->is_available,
                        'quantity' => $item->quantity,
                        'item_total' => $item->item_total,
                        'created_at' => $item->menuItem->created_at,
                        'updated_at' => $item->menuItem->updated_at,
                    ]
                )
            ];

            return response()->json([
                'message' => 'Cart created or updated successfully.',
                'cart' => $formattedCart,
            ], 200);
        } catch (\Throwable $e) {
            return response()->json([
                'message' => 'Could not create or update cart.',
            ], 500);
        }
    }

    /**
     * Delete a cart for the authenticated user.
     *
     * @param Cart $cart
     * @return JsonResponse
     */
    public function deleteCart(Cart $cart): JsonResponse
    {
        try {
            $cart->delete();

            return response()->json([
                'message' => 'Cart deleted successfully.',
            ], 200);
        } catch (\Throwable $e) {
            return response()->json([
                'message' => 'Could not delete cart.',
            ], 500);
        }
    }
}
