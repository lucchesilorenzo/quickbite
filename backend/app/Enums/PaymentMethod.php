<?php

declare(strict_types=1);

namespace App\Enums;

enum PaymentMethod: string
{
    case CASH = 'cash';

    /**
     * Get the enum values.
     */
    public static function values(): array
    {
        return collect(self::cases())->pluck('value')->toArray();
    }
}
