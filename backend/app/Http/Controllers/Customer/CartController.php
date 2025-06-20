<?php

namespace App\Http\Controllers\Customer;

use App\Http\Controllers\Controller;
use App\Http\Requests\Cart\CreateOrUpdateCartRequest;
use App\Models\Restaurant;
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

            $formattedCarts = $carts->mapWithKeys(function ($cart) {
                return [
                    $cart->restaurant_id =>
                    [
                        'restaurant_id' => $cart->restaurant_id,
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
                    ],
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

            // Get restaurant
            $restaurant = Restaurant::find($data['restaurant_id']);

            if ($data['cart_total'] < $restaurant->min_amount) {
                return response()->json([
                    'message' => 'Cart total is less than restaurant minimum order amount.',
                ], 400);
            }

            // Update or create cart
            $cart = $user->carts()->updateOrCreate(
                ['restaurant_id' => $data['restaurant_id']],
                [
                    'restaurant_id' => $data['restaurant_id'],
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

            return response()->json([
                'message' => 'Cart created or updated successfully.',
                'cart' => $cart,
            ], 200);
        } catch (\Throwable $e) {
            return response()->json([
                'message' => 'Could not create or update cart.',
            ], 500);
        }
    }
}
