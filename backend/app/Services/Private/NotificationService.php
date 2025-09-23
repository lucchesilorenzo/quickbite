<?php

declare(strict_types=1);

namespace App\Services\Private;

use App\Models\User;

class NotificationService
{
    private const int PER_PAGE = 5;

    public function getNotifications(User $user): array
    {
        return [
            'notifications' => $user->notifications()
                ->paginate(self::PER_PAGE),
            'unread_count' => $user->unreadNotifications()->count(),
        ];
    }

    public function markNotificationsAsRead(User $user): void
    {
        $user->unreadNotifications()
            ->update(['read_at' => now()]);
    }
}
