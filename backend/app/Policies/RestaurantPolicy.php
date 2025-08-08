<?php

declare(strict_types=1);

namespace App\Policies;

use App\Models\Restaurant;
use App\Models\User;
use Illuminate\Auth\Access\Response;

class RestaurantPolicy
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
    public function view(User $user, Restaurant $restaurant): bool
    {
        return false;
    }

    /**
     * Determine whether the user can view the model.
     */
    public function viewPartnerRestaurant(User $user, Restaurant $restaurant): Response
    {
        return $user->restaurants()
            ->where('id', $restaurant->id)
            ->exists()
            ? Response::allow()
            : Response::deny('You are not authorized to view this restaurant.');
    }

    /**
     * Determine whether the user can create models.
     */
    public function create(User $user): bool
    {
        return false;
    }

    /**
     * Determine whether the user can create models.
     */
    public function createOffer(User $user, Restaurant $restaurant): Response
    {
        return $user->restaurants()
            ->where('id', $restaurant->id)
            ->exists()
            ? Response::allow()
            : Response::deny('You are not authorized to update this offer.');
    }

    /**
     * Determine whether the user can update the model.
     */
    public function update(User $user, Restaurant $restaurant): Response
    {
        return $user->restaurants()
            ->where('id', $restaurant->id)
            ->exists()
            ? Response::allow()
            : Response::deny('You are not authorized to update this resource.');
    }

    /**
     * Determine whether the user can delete the model.
     */
    public function delete(User $user, Restaurant $restaurant): bool
    {
        return false;
    }

    /**
     * Determine whether the user can restore the model.
     */
    public function restore(User $user, Restaurant $restaurant): bool
    {
        return false;
    }

    /**
     * Determine whether the user can permanently delete the model.
     */
    public function forceDelete(User $user, Restaurant $restaurant): bool
    {
        return false;
    }
}
