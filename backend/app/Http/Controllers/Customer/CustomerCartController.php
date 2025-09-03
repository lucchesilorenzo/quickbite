<?php

declare(strict_types=1);

namespace App\Http\Controllers\Customer;

use App\Http\Controllers\Controller;
use App\Http\Requests\Customer\Cart\CustomerCreateOrUpdateCartRequest;
use App\Http\Requests\Customer\Cart\CustomerCreateOrUpdateCartsRequest;
use App\Models\Cart;
use App\Services\Customer\CustomerCartService;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Gate;
use Throwable;

class CustomerCartController extends Controller
{
    public function __construct(
        private CustomerCartService $customerCartService
    ) {}

    /**
     * Get customer's carts.
     */
    public function getCarts(): JsonResponse
    {
        try {
            $carts = $this->customerCartService->getCarts();

            return response()->json($carts, 200);
        } catch (Throwable $e) {
            return response()->json([
                'message' => 'Could not get carts.',
            ], 500);
        }
    }

    /**
     * Get customer's cart.
     */
    public function getCart(Cart $cart): JsonResponse
    {
        Gate::authorize('view', $cart);

        try {
            $cart = $this->customerCartService->getCart($cart);

            return response()->json($cart, 200);
        } catch (Throwable $e) {
            return response()->json([
                'message' => 'Could not get cart.',
            ], 500);
        }
    }

    /**
     * Create or update multiple carts for customer.
     */
    public function createOrUpdateCarts(CustomerCreateOrUpdateCartsRequest $request): JsonResponse
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
                if (! $existingCart) {
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
                    Gate::authorize('update', $existingCart);

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
        } catch (Throwable $e) {
            return response()->json([
                'message' => 'Could not merge carts.',
            ], 500);
        }
    }

    /**
     * Update a cart for customer.
     */
    public function createOrUpdateCart(CustomerCreateOrUpdateCartRequest $request): JsonResponse
    {
        // Get validated data
        $data = $request->validated();

        try {
            $user = auth()->user();

            $cart = $user->carts()->where('restaurant_id', $data['restaurant']['id'])->first();

            if (! $cart) {
                $cart = $user->carts()->create(
                    [
                        'restaurant_id' => $data['restaurant']['id'],
                        'cart_total' => $data['cart_total'],
                        'total_items' => $data['total_items'],
                        'total_unique_items' => $data['total_unique_items'],
                    ]
                );

                foreach ($data['items'] as $item) {
                    $cart->cartItems()->create(
                        [
                            'menu_item_id' => $item['id'],
                            'quantity' => $item['quantity'],
                            'item_total' => $item['item_total'],
                        ]
                    );
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
                    'id' => $cart->id,
                    'restaurant' => $restaurant,
                    'total_items' => $cart->total_items,
                    'total_unique_items' => $cart->total_unique_items,
                    'cart_total' => $cart->cart_total,
                    'items' => $cart->cartItems->map(
                        fn ($item) => [
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
                    ),
                ];

                return response()->json([
                    'message' => 'Cart created successfully.',
                    'cart' => $formattedCart,
                ], 201);
            }

            Gate::authorize('update', $cart);

            if (empty($data['items'])) {
                $cart->delete();

                return response()->json([
                    'message' => 'Cart deleted because it has no items.',
                    'cart' => null,
                ], 200);
            }

            // Update cart
            $cart->update(
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
            foreach ($data['items'] as $item) {
                $cart->cartItems()->create(
                    [
                        'menu_item_id' => $item['id'],
                        'quantity' => $item['quantity'],
                        'item_total' => $item['item_total'],
                    ]
                );
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
                'id' => $cart->id,
                'restaurant' => $restaurant,
                'total_items' => $cart->total_items,
                'total_unique_items' => $cart->total_unique_items,
                'cart_total' => $cart->cart_total,
                'items' => $cart->cartItems->map(
                    fn ($item) => [
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
                ),
            ];

            return response()->json([
                'message' => 'Cart updated successfully.',
                'cart' => $formattedCart,
            ], 200);
        } catch (Throwable $e) {
            return response()->json([
                'message' => 'Could not update cart.',
            ], 500);
        }
    }

    /**
     * Delete a cart for customer.
     */
    public function deleteCart(Cart $cart): JsonResponse
    {
        // Check if user owns cart
        Gate::authorize('delete', $cart);

        try {
            $cart->delete();

            return response()->json([
                'message' => 'Cart deleted successfully.',
            ], 200);
        } catch (Throwable $e) {
            return response()->json([
                'message' => 'Could not delete cart.',
            ], 500);
        }
    }
}
