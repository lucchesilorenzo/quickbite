<?php

declare(strict_types=1);

namespace App\Policies;

use App\Models\Offer;
use App\Models\Restaurant;
use App\Models\User;
use App\Traits\HasRestaurantAuthorization;
use Illuminate\Auth\Access\Response;

class OfferPolicy
{
    use HasRestaurantAuthorization;

    public function viewAny(User $user, Restaurant $restaurant): Response
    {
        return $this->isPartner($user, $restaurant)
            ? Response::allow()
            : Response::deny('You are not authorized to view any offers.');
    }

    public function create(User $user, Restaurant $restaurant): Response
    {
        return $this->isPartner($user, $restaurant)
            ? Response::allow()
            : Response::deny('You are not authorized to create this offer.');
    }

    public function update(User $user, Offer $offer): Response
    {
        return $this->isPartner($user, $offer->restaurant)
            ? Response::allow()
            : Response::deny('You are not authorized to update this offer.');
    }

    public function delete(User $user, Offer $offer): Response
    {
        return $this->isPartner($user, $offer->restaurant)
            ? Response::allow()
            : Response::deny('You are not authorized to delete this offer.');
    }
}
