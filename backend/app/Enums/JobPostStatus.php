<?php

declare(strict_types=1);

namespace App\Enums;

enum JobPostStatus: string
{
    case OPEN = 'open';
    case CLOSED = 'closed';

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
