<?php

declare(strict_types=1);

namespace App\Enums;

enum JobApplicationStatus: string
{
    case PENDING = 'pending';
    case ACCEPTED = 'accepted';
    case REJECTED = 'rejected';

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
