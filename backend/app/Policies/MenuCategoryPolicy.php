<?php

declare(strict_types=1);

namespace App\Policies;

use App\Models\MenuCategory;
use App\Models\User;
use App\Traits\HasRestaurantAuthorization;
use Illuminate\Auth\Access\Response;

class MenuCategoryPolicy
{
    use HasRestaurantAuthorization;

    // === PARTNER ===

    public function createMenuItem(User $user, MenuCategory $menuCategory): Response
    {
        return $this->isPartner($user, $menuCategory->restaurant)
            ? Response::allow()
            : Response::deny('You are not authorized to create a menu item.');
    }

    public function update(User $user, MenuCategory $menuCategory): Response
    {
        return $this->isPartner($user, $menuCategory->restaurant)
            ? Response::allow()
            : Response::deny('You are not authorized to update this menu category.');
    }

    public function delete(User $user, MenuCategory $menuCategory): Response
    {
        return $this->isPartner($user, $menuCategory->restaurant)
            ? Response::allow()
            : Response::deny('You are not authorized to delete this menu category.');
    }
}
