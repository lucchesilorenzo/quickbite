<?php

declare(strict_types=1);

namespace App\Traits;

use App\Models\Restaurant;
use App\Models\User;

trait HasRestaurantAuthorization
{
    public function isPartner(User $user, Restaurant $restaurant): bool
    {
        return $restaurant->partners()
            ->where('user_id', $user->id)
            ->exists();
    }

    public function isRider(User $user, Restaurant $restaurant): bool
    {
        return $restaurant->riders()
            ->where('user_id', $user->id)
            ->exists();
    }
}
