<?php

declare(strict_types=1);

namespace App\Services\Private\Rider;

use App\Enums\RestaurantRole;
use App\Models\Delivery;
use App\Models\Restaurant;
use App\Models\User;
use Illuminate\Pagination\LengthAwarePaginator;

class RestaurantService
{
    private const int PER_PAGE = 10;

    public function getRestaurant(User $rider): ?Restaurant
    {
        return $this->getActiveRestaurant($rider);
    }

    public function getDeliveries(User $rider): LengthAwarePaginator
    {
        $restaurant = $this->getActiveRestaurant($rider);

        return Delivery::query()
            ->with(['order.orderItems'])
            ->whereHas('order', function ($query) use ($restaurant) {
                $query->where('restaurant_id', $restaurant->id);
            })
            ->where('rider_id', $rider->id)
            ->paginate(self::PER_PAGE);
    }

    private function getActiveRestaurant(User $rider): ?Restaurant
    {
        return $rider->restaurants()
            ->wherePivot('role', RestaurantRole::RIDER->value)
            ->where('is_active', true)
            ->first();
    }
}
