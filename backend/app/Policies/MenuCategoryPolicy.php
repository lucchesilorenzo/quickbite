<?php

declare(strict_types=1);

namespace App\Policies;

use App\Models\MenuCategory;
use App\Models\Restaurant;
use App\Models\User;
use App\Traits\HasRestaurantAuthorization;
use Illuminate\Auth\Access\Response;

class MenuCategoryPolicy
{
    use HasRestaurantAuthorization;

    public function create(User $user, Restaurant $restaurant): Response
    {
        return $this->isPartner($user, $restaurant)
            ? Response::allow()
            : Response::deny('You are not authorized to create this menu category.');
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
