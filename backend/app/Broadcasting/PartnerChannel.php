<?php

declare(strict_types=1);

namespace App\Broadcasting;

use App\Models\Restaurant;
use App\Models\User;
use App\Traits\HasRestaurantAuthorization;

class PartnerChannel
{
    use HasRestaurantAuthorization;

    /**
     * Authenticate the user's access to the channel.
     */
    public function join(User $user, string $userId, string $restaurantId): bool
    {
        if ((string) $user->id !== $userId) {
            return false;
        }

        $restaurant = Restaurant::query()->find($restaurantId);

        if (! $restaurant) {
            return false;
        }

        return $this->isPartner($user, $restaurant);
    }
}
