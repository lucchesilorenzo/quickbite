<?php

declare(strict_types=1);

namespace App\Policies;

use App\Models\Restaurant;
use App\Models\User;
use App\Traits\HasRestaurantAuthorization;
use Illuminate\Auth\Access\Response;

class RestaurantPolicy
{
    use HasRestaurantAuthorization;

    public function viewPartnerStats(User $user, Restaurant $restaurant): Response
    {
        return $this->isPartner($user, $restaurant)
            ? Response::allow()
            : Response::deny('You are not authorized to view the stats.');
    }

    public function viewPartnerMenu(User $user, Restaurant $restaurant): Response
    {
        return $this->isPartner($user, $restaurant)
            ? Response::allow()
            : Response::deny('You are not authorized to view menu.');
    }

    public function view(User $user, Restaurant $restaurant): Response
    {
        return $this->isPartner($user, $restaurant)
            ? Response::allow()
            : Response::deny('You are not authorized to view this restaurant.');
    }

    public function update(User $user, Restaurant $restaurant): Response
    {
        return $this->isPartner($user, $restaurant)
            ? Response::allow()
            : Response::deny('You are not authorized to update this resource.');
    }
}
