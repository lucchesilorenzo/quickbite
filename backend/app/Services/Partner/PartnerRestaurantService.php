<?php

declare(strict_types=1);

namespace App\Services\Partner;

use App\Models\Restaurant;

class PartnerRestaurantService
{
    public function getRestaurant(Restaurant $restaurant): Restaurant
    {
        $restaurant->load(
            [
                'categories',
                'deliveryDays' => fn ($query) => $query->orderBy('order'),
            ]
        );

        return $restaurant;
    }
}
