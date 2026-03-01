<?php

declare(strict_types=1);

namespace App\Services\Private\Rider;

use App\Models\Delivery;
use App\Models\Restaurant;
use App\Models\User;
use Illuminate\Pagination\LengthAwarePaginator;

class DeliveryService
{
    private const int PER_PAGE = 10;

    public function getDeliveries(User $rider): LengthAwarePaginator
    {
        $restaurant = Restaurant::getActiveRestaurantForRider($rider);

        return Delivery::query()
            ->with(['order.orderItems'])
            ->whereHas('order', function ($query) use ($restaurant): void {
                $query->where('restaurant_id', $restaurant->id);
            })
            ->where('rider_id', $rider->id)
            ->paginate(self::PER_PAGE);
    }
}
