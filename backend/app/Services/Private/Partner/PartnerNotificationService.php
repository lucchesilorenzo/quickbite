<?php

declare(strict_types=1);

namespace App\Services\Private\Partner;

use App\Models\Restaurant;
use App\Models\User;

class PartnerNotificationService
{
    private const int PER_PAGE = 5;

    public function getNotifications(Restaurant $restaurant, User $partner): array
    {
        return [
            'notifications' => $partner->notifications()
                ->whereRaw("data::jsonb->'meta'->>'restaurant_id' = ?", [$restaurant->id])
                ->paginate(self::PER_PAGE),
            'unread_count' => $partner->unreadNotifications()
                ->whereRaw("data::jsonb->'meta'->>'restaurant_id' = ?", [$restaurant->id])
                ->count(),

        ];
    }

    public function markNotificationsAsRead(Restaurant $restaurant, User $partner): void
    {
        $partner->unreadNotifications()
            ->whereRaw("data::jsonb->'meta'->>'restaurant_id' = ?", [$restaurant->id])
            ->update([
                'read_at' => now(),
            ]);
    }
}
