<?php

declare(strict_types=1);

namespace App\Policies;

use App\Models\RestaurantOffer;
use App\Models\User;
use Illuminate\Auth\Access\Response;

class RestaurantOfferPolicy
{
    /**
     * Determine whether the user can view any models.
     */
    public function viewAny(User $user): bool
    {
        return false;
    }

    /**
     * Determine whether the user can view the model.
     */
    public function view(User $user, RestaurantOffer $offer): bool
    {
        return false;
    }

    /**
     * Determine whether the user can create models.
     */
    public function create(User $user): bool
    {
        return false;
    }

    /**
     * Determine whether the user can update the model.
     */
    public function update(User $user, RestaurantOffer $offer): Response
    {
        return $user->restaurants()
            ->where('id', $offer->restaurant_id)
            ->exists()
            ? Response::allow()
            : Response::deny('You are not authorized to update this offer.');
    }

    /**
     * Determine whether the user can delete the model.
     */
    public function delete(User $user, RestaurantOffer $offer): Response
    {
        return $user->restaurants()
            ->where('id', $offer->restaurant_id)
            ->exists()
            ? Response::allow()
            : Response::deny('You are not authorized to delete this offer.');
    }

    /**
     * Determine whether the user can restore the model.
     */
    public function restore(User $user, RestaurantOffer $offer): bool
    {
        return false;
    }

    /**
     * Determine whether the user can permanently delete the model.
     */
    public function forceDelete(User $user, RestaurantOffer $offer): bool
    {
        return false;
    }
}
