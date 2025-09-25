<?php

declare(strict_types=1);

namespace App\Enums;

enum RestaurantRole: string
{
    case OWNER = 'owner';
    case CO_OWNER = 'co-owner';
    case RIDER = 'rider';

    /**
     * Get the enum values.
     */
    public static function values(): array
    {
        return collect(self::cases())
            ->pluck('value')
            ->toArray();
    }
}
