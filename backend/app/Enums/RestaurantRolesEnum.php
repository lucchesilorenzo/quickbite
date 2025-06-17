<?php

namespace App\Enums;

enum RestaurantRolesEnum: string
{
    case OWNER = 'owner';
    case CO_OWNER = 'co-owner';
    case RIDER = 'rider';

    /**
     * Get the enum values.
     *
     * @return array
     */
    public static function values(): array
    {
        return collect(self::cases())->pluck('value')->toArray();
    }
}
