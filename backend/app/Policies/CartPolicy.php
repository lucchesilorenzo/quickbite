<?php

declare(strict_types=1);

namespace App\Policies;

use App\Models\Cart;
use App\Models\User;
use Illuminate\Auth\Access\Response;

class CartPolicy
{
    // === CUSTOMER ===

    public function view(User $user, Cart $cart): Response
    {
        return $user->id === $cart->user_id
            ? Response::allow()
            : Response::deny('You are not authorized to view this cart.');
    }

    public function update(User $user, Cart $cart): Response
    {
        return $user->id === $cart->user_id
            ? Response::allow()
            : Response::deny('You are not authorized to update this cart.');
    }

    public function delete(User $user, Cart $cart): Response
    {
        return $user->id === $cart->user_id
            ? Response::allow()
            : Response::deny('You are not authorized to delete this cart.');
    }
}
