<?php

declare(strict_types=1);

namespace App\Services\Customer;

use App\Models\Cart;
use App\Models\User;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\DB;

class CustomerCartService
{
    public function getCarts(?User $user): Collection
    {
        $carts = $user->carts()
            ->with(['restaurant', 'cartItems.menuItem'])
            ->get();

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

        return $formattedCarts;
    }

    public function getCart(Cart $cart): array
    {
        // Eager load cart items
        $cart->load('cartItems.menuItem');

        // Get restaurant
        $restaurant = $cart->restaurant()->first();

        // Format cart
        $formattedCart = [
            'id' => $cart->id,
            'restaurant' => $restaurant,
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

        return $formattedCart;
    }

    public function createOrUpdateCarts(?User $user, array $data): Collection
    {
        DB::transaction(function () use ($user, $data) {
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
                    // Merge items
                    foreach ($cart['items'] as $newItem) {
                        $existingItem = $existingCart->cartItems()
                            ->where('menu_item_id', $newItem['id'])
                            ->first();

                        // If item exists, update quantity; otherwise, create new item
                        if ($existingItem) {
                            $newQuantity = $existingItem->quantity + $newItem['quantity'];

                            $existingItem->update([
                                'quantity' => $newQuantity,
                                'item_total' => $newQuantity * $newItem['price'],
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
                    $existingCart->update([
                        'total_items' => $existingCart->cartItems->sum('quantity'),
                        'total_unique_items' => $existingCart->cartItems->count(),
                        'cart_total' => $existingCart->cartItems->sum('item_total'),
                    ]);
                }
            }
        });

        $formattedCarts = $user->carts()
            ->with(['restaurant', 'cartItems.menuItem'])
            ->get()
            ->map(function ($cart) {
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

        return $formattedCarts;
    }
}
