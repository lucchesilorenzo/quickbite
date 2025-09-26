<?php

declare(strict_types=1);

namespace App\Enums;

enum OrderStatus: string
{
    case PENDING = 'pending';
    case ACCEPTED = 'accepted';
    case REJECTED = 'rejected';
    case PREPARING = 'preparing';
    case DELIVERING = 'delivering';
    case DELIVERED = 'delivered';
    case CANCELLED = 'cancelled';

    /**
     * Get the enum values.
     */
    public static function values(): array
    {
        return collect(self::cases())
            ->pluck('value')
            ->toArray();
    }

    /**
     * Get the partner transitions.
     */
    public static function partnerTransitions(): array
    {
        return [
            self::PENDING->value => [self::ACCEPTED->value, self::REJECTED->value],
            self::ACCEPTED->value => [self::PREPARING->value],
            self::REJECTED->value => [],
            self::PREPARING->value => [],
            self::DELIVERING->value => [],
            self::DELIVERED->value => [],
            self::CANCELLED->value => [],
        ];
    }
}
