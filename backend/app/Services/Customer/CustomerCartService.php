<?php

declare(strict_types=1);

namespace App\Services\Customer;

use App\Models\Cart;
use Illuminate\Support\Collection;

class CustomerCartService
{
    public function getCarts(): Collection
    {
        $user = auth()->user();

        $carts = $user->carts()
            ->with(['cartItems.menuItem'])
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
        $restaurant = $cart->restaurant()
            ->with([
                'categories',
                'deliveryDays',
                'offers' => function ($query) {
                    $query->orderBy('discount_rate');
                },
                'reviews' => function ($query) {
                    $query->orderByDesc('created_at');
                },
                'reviews.customer',
                'menuCategories' => function ($query) {
                    $query->orderBy('order')
                        ->with('menuItems', function ($query) {
                            $query->orderBy('order');
                        });
                },
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
}
