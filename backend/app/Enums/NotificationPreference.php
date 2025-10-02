<?php

declare(strict_types=1);

namespace App\Enums;

enum NotificationPreference: string
{
    case NEW_ORDER = 'new_order';
    case NEW_REVIEW = 'new_review';

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
