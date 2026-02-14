<?php

declare(strict_types=1);

namespace App\Services\Private\Rider;

use App\Enums\RestaurantRole;
use App\Models\Restaurant;
use App\Models\User;

class RestaurantService
{
    public function getRestaurant(User $rider): ?Restaurant
    {
        return $rider->restaurants()
            ->wherePivot('role', RestaurantRole::RIDER->value)
            ->where('is_active', true)
            ->first();
    }
}
