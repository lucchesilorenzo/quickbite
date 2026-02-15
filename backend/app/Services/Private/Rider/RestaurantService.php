<?php

declare(strict_types=1);

namespace App\Services\Private\Rider;

use App\Enums\RestaurantRole;
use App\Models\Delivery;
use App\Models\Restaurant;
use App\Models\User;
use Illuminate\Support\Collection;

class RestaurantService
{
    public function getRestaurant(User $rider): ?Restaurant
    {
        return $this->getActiveRestaurant($rider);
    }

    public function getDeliveries(User $rider): Collection
    {
        $restaurant = $this->getActiveRestaurant($rider);

        return Delivery::query()
            ->whereHas('order', function ($query) use ($restaurant) {
                $query->where('restaurant_id', $restaurant->id);
            })
            ->where('rider_id', $rider->id)
            ->get();
    }

    private function getActiveRestaurant(User $rider): ?Restaurant
    {
        return $rider->restaurants()
            ->wherePivot('role', RestaurantRole::RIDER->value)
            ->where('is_active', true)
            ->first();
    }
}
