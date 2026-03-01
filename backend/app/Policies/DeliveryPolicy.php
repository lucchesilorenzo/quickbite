<?php

declare(strict_types=1);

namespace App\Policies;

use App\Models\Delivery;
use App\Models\Restaurant;
use App\Models\User;
use Illuminate\Auth\Access\Response;

class DeliveryPolicy
{
    public function viewAny(User $rider): Response
    {
        $restaurant = Restaurant::getActiveRestaurantForRider($rider);

        return $restaurant instanceof Restaurant
            ? Response::allow()
            : Response::deny('You are not authorized to view any deliveries.');
    }

    public function update(User $rider, Delivery $delivery): Response
    {
        return $delivery->rider_id === $rider->id
            ? Response::allow()
            : Response::deny('You are not authorized to update this delivery.');
    }
}
