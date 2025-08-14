<?php

declare(strict_types=1);

namespace App\Policies;

use App\Models\MenuCategory;
use App\Models\User;
use Illuminate\Auth\Access\Response;

class MenuCategoryPolicy
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
    public function view(User $user, MenuCategory $menuCategory): bool
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
     * Determine whether the user can create a menu item.
     */
    public function createMenuItem(User $user, MenuCategory $menuCategory): Response
    {
        return $menuCategory->restaurant->partners()
            ->where('user_id', $user->id)
            ->exists()
            ? Response::allow()
            : Response::deny('You are not authorized to create a menu item.');
    }

    /**
     * Determine whether the user can update the model.
     */
    public function update(User $user, MenuCategory $menuCategory): Response
    {
        return $user->restaurants()
            ->where('id', $menuCategory->restaurant_id)
            ->exists()
            ? Response::allow()
            : Response::deny('You are not authorized to update this menu category.');
    }

    /**
     * Determine whether the user can delete the model.
     */
    public function delete(User $user, MenuCategory $menuCategory): Response
    {
        return $user->restaurants()
            ->where('id', $menuCategory->restaurant_id)
            ->exists()
            ? Response::allow()
            : Response::deny('You are not authorized to delete this menu category.');
    }

    /**
     * Determine whether the user can restore the model.
     */
    public function restore(User $user, MenuCategory $menuCategory): bool
    {
        return false;
    }

    /**
     * Determine whether the user can permanently delete the model.
     */
    public function forceDelete(User $user, MenuCategory $menuCategory): bool
    {
        return false;
    }
}
