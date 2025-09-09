<?php

declare(strict_types=1);

namespace App\Enums;

enum DiscountRate: string
{
    case FIVE = 0.05;
    case TEN = 0.10;
    case FIFTEEN = 0.15;
    case TWENTY = 0.20;
    case TWENTY_FIVE = 0.25;
    case THIRTY = 0.30;
    case THIRTY_FIVE = 0.35;
    case FORTY = 0.40;
    case FORTY_FIVE = 0.45;
    case FIFTY = 0.50;

    /**
     * Get the enum values.
     */
    public static function values(): array
    {
        return collect(self::cases())->pluck('value')->toArray();
    }
}
