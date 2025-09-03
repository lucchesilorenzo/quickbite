<?php

declare(strict_types=1);

namespace App\Services\Customer;

use App\Models\Cart;
use App\Models\User;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\DB;

class CustomerCartService
{
    public function getCarts(User $user): Collection
    {
        $carts = $user->carts()
            ->with(['restaurant', 'cartItems.menuItem'])
            ->get();

        return $carts;
    }

    public function getCart(Cart $cart): Cart
    {
        $cart->load(['restaurant', 'cartItems.menuItem']);

        return $cart;
    }

    public function createOrUpdateCarts(User $user, array $data): Collection
    {
        return DB::transaction(function () use ($user, $data) {
            foreach ($data as $cart) {
                // Get existing cart
                $existingCart = $user->carts()
                    ->where('restaurant_id', $cart['restaurant']['id'])
                    ->first();

                // Check if cart exists
                if (! $existingCart) {
                    $newCart = $user->carts()->create([
                        'restaurant_id' => $cart['restaurant']['id'],
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

            $carts = $user->carts()
                ->with(['restaurant', 'cartItems.menuItem'])
                ->get();

            return $carts;
        });
    }

    public function createOrUpdateCart(User $user, array $data): ?Cart
    {
        return DB::transaction(function () use ($user, $data) {
            if (empty($data['items'])) {
                $cart = $user->carts()
                    ->where('restaurant_id', $data['restaurant']['id'])
                    ->first();

                if ($cart) {
                    $cart->delete();
                }

                return null;
            }

            $cart = $user->carts()
                ->with('restaurant')
                ->firstOrCreate(
                    ['restaurant_id' => $data['restaurant']['id']],
                    [
                        'cart_total' => $data['cart_total'],
                        'total_items' => $data['total_items'],
                        'total_unique_items' => $data['total_unique_items'],
                    ]
                );

            $cart->cartItems()->delete();

            foreach ($data['items'] as $item) {
                $cart->cartItems()->create([
                    'menu_item_id' => $item['id'],
                    'quantity' => $item['quantity'],
                    'item_total' => $item['item_total'],
                ]);
            }

            $cart->update([
                'total_items' => $cart->cartItems->sum('quantity'),
                'total_unique_items' => $cart->cartItems->count(),
                'cart_total' => $cart->cartItems->sum('item_total'),
            ]);

            return $cart;
        });
    }
}
