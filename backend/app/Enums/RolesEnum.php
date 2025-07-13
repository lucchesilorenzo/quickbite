<?php

declare(strict_types=1);

namespace App\Enums;

enum RolesEnum: string
{
    case CUSTOMER = 'customer';
    case PARTNER = 'partner';
    case RIDER = 'rider';

    /**
     * Get the enum values.
     */
    public static function values(): array
    {
        return collect(self::cases())->pluck('value')->toArray();
    }
}
