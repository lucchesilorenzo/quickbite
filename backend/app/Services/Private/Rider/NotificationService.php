<?php

declare(strict_types=1);

namespace App\Services\Private\Rider;

use App\Models\User;

class NotificationService
{
    private const int PER_PAGE = 5;

    public function getNotifications(User $rider): array
    {
        return [
            'notifications' => $rider->notifications()
                ->paginate(self::PER_PAGE),
            'unread_count' => $rider->unreadNotifications()
                ->count(),
        ];
    }

    public function markNotificationsAsRead(User $rider): void
    {
        $rider->unreadNotifications()
            ->update([
                'read_at' => now(),
            ]);
    }
}
