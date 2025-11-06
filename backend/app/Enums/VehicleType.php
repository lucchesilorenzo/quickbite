<?php

declare(strict_types=1);

namespace App\Enums;

enum VehicleType: string
{
    case CAR = 'car';
    case SCOOTER = 'scooter';

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
