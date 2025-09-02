<?php

declare(strict_types=1);

namespace App\Services\Customer;

use Illuminate\Support\Collection;

class CustomerCartService
{
    public function getCarts(): Collection
    {
        $user = auth()->user();

        $baseCarts = $user->carts()->with(['cartItems.menuItem'])->get();

        $carts = $baseCarts->map(function ($cart) {
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

        return $carts;
    }
}
