<?php

namespace App\Http\Controllers\Customer;

use App\Http\Controllers\Controller;
use App\Http\Requests\Cart\CreateOrUpdateCartRequest;
use App\Models\Cart;
use Illuminate\Http\JsonResponse;

class CartController extends Controller
{
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
                'error' => $e->getMessage(),
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
}
