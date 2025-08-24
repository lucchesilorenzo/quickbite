<?php

declare(strict_types=1);

namespace App\Policies;

use App\Models\Order;
use App\Models\User;
use App\Traits\HasRestaurantAuthorization;
use Illuminate\Auth\Access\Response;

class OrderPolicy
{
    use HasRestaurantAuthorization;

    // === CUSTOMER ===

    public function view(User $user, Order $order): Response
    {
        return $user->id === $order->user_id
            ? Response::allow()
            : Response::deny('You are not authorized to view this order.');
    }

    // === PARTNER ===

    public function updatePartnerOrder(User $user, Order $order): Response
    {
        return $this->isPartner($user, $order->restaurant)
            ? Response::allow()
            : Response::deny('You are not authorized to update this order.');
    }
}
