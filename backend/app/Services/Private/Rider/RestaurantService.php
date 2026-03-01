<?php

declare(strict_types=1);

namespace App\Services\Private\Rider;

use App\Models\Restaurant;
use App\Models\User;

class RestaurantService
{
    public function getRestaurant(User $rider): ?Restaurant
    {
        return Restaurant::getActiveRestaurantForRider($rider);
    }
}
