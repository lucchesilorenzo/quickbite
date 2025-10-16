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

    // === PARTNER ===

    public function viewPartnerOrders(User $user, Restaurant $restaurant): Response
    {
        return $this->isPartner($user, $restaurant)
            ? Response::allow()
            : Response::deny('You are not authorized to view the orders.');
    }

    public function viewPartnerReviews(User $user, Restaurant $restaurant): Response
    {
        return $this->isPartner($user, $restaurant)
            ? Response::allow()
            : Response::deny('You are not authorized to view the reviews.');
    }

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

    public function viewPartnerRestaurant(User $user, Restaurant $restaurant): Response
    {
        return $this->isPartner($user, $restaurant)
            ? Response::allow()
            : Response::deny('You are not authorized to view this restaurant.');
    }

    public function createPartnerOffer(User $user, Restaurant $restaurant): Response
    {
        return $this->isPartner($user, $restaurant)
            ? Response::allow()
            : Response::deny('You are not authorized to update this offer.');
    }

    public function createPartnerMenuCategory(User $user, Restaurant $restaurant): Response
    {
        return $this->isPartner($user, $restaurant)
            ? Response::allow()
            : Response::deny('You are not authorized to update this menu category.');
    }

    public function update(User $user, Restaurant $restaurant): Response
    {
        return $this->isPartner($user, $restaurant)
            ? Response::allow()
            : Response::deny('You are not authorized to update this resource.');
    }
}
