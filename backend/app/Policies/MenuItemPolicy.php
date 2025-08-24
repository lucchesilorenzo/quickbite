<?php

declare(strict_types=1);

namespace App\Policies;

use App\Models\MenuItem;
use App\Models\User;
use App\Traits\HasRestaurantAuthorization;
use Illuminate\Auth\Access\Response;

class MenuItemPolicy
{
    use HasRestaurantAuthorization;

    // === PARTNER ===

    public function update(User $user, MenuItem $menuItem): Response
    {
        return $this->isPartner($user, $menuItem->menuCategory->restaurant)
            ? Response::allow()
            : Response::deny('You are not authorized to update this menu item.');
    }

    public function delete(User $user, MenuItem $menuItem): Response
    {
        return $this->isPartner($user, $menuItem->menuCategory->restaurant)
            ? Response::allow()
            : Response::deny('You are not authorized to create a menu item.');
    }
}
