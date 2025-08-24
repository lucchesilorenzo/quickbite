<?php

declare(strict_types=1);

namespace App\Policies;

use App\Models\RestaurantOffer;
use App\Models\User;
use App\Traits\HasRestaurantAuthorization;
use Illuminate\Auth\Access\Response;

class RestaurantOfferPolicy
{
    use HasRestaurantAuthorization;

    // === PARTNER ===

    public function update(User $user, RestaurantOffer $offer): Response
    {
        return $this->isPartner($user, $offer->restaurant)
            ? Response::allow()
            : Response::deny('You are not authorized to update this offer.');
    }

    public function delete(User $user, RestaurantOffer $offer): Response
    {
        return $this->isPartner($user, $offer->restaurant)
            ? Response::allow()
            : Response::deny('You are not authorized to delete this offer.');
    }
}
