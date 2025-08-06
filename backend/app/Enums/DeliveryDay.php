<?php

declare(strict_types=1);

namespace App\Enums;

enum DeliveryDay: string
{
    case MONDAY = 'MONDAY';
    case TUESDAY = 'TUESDAY';
    case WEDNESDAY = 'WEDNESDAY';
    case THURSDAY = 'THURSDAY';
    case FRIDAY = 'FRIDAY';
    case SATURDAY = 'SATURDAY';
    case SUNDAY = 'SUNDAY';

    /**
     * Get the enum values.
     */
    public static function values(): array
    {
        return collect(self::cases())->pluck('value')->toArray();
    }
}
