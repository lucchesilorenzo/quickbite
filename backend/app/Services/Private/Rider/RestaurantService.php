<?php

declare(strict_types=1);

namespace App\Services\Private\Rider;

use App\Exceptions\Private\Rider\ActiveDeliveryException;
use App\Exceptions\Private\Rider\NoActiveRestaurantException;
use App\Models\Delivery;
use App\Models\Restaurant;
use App\Models\User;

class RestaurantService
{
    public function __construct(
        private readonly DeliveryService $deliveryService
    ) {}

    public function getRestaurant(User $rider): ?Restaurant
    {
        $activeRestaurant = Restaurant::getActiveRestaurantForRider($rider);

        if (! $activeRestaurant instanceof Restaurant) {
            throw new NoActiveRestaurantException;
        }

        return $activeRestaurant;
    }

    public function leaveRestaurant(User $rider): void
    {
        $activeDelivery = $this->deliveryService->getActiveDelivery($rider);

        if ($activeDelivery instanceof Delivery) {
            throw new ActiveDeliveryException;
        }

        $activeRestaurant = $this->getRestaurant($rider);

        $activeRestaurant->riders()->detach($rider);
    }
}
