<?php

declare(strict_types=1);

namespace App\Http\Controllers\Api\V1\Private\Rider;

use App\Http\Controllers\Controller;
use App\Services\Private\Rider\NotificationService;
use Dedoc\Scramble\Attributes\Group;
use Illuminate\Http\JsonResponse;
use Throwable;

#[Group('Rider Notifications')]
class NotificationController extends Controller
{
    public function __construct(
        private readonly NotificationService $notificationService,
    ) {}

    /**
     * Get all notifications.
     */
    public function getNotifications(): JsonResponse
    {
        try {
            $notificationsData = $this->notificationService->getNotifications(
                auth()->user()
            );

            return response()->json([
                'success' => true,
                'message' => 'Notifications retrieved successfully.',
                'notifications' => $notificationsData['notifications'],
                'unread_count' => $notificationsData['unread_count'],
            ], 200);
        } catch (Throwable) {
            return response()->json([
                'success' => false,
                'message' => 'Could not get notifications.',
            ], 500);
        }
    }

    /**
     * Mark notifications as read.
     */
    public function markNotificationsAsRead(): JsonResponse
    {
        try {
            $this->notificationService->markNotificationsAsRead(
                auth()->user()
            );

            return response()->json([
                'success' => true,
                'message' => 'Notifications successfully marked as read.',
            ], 200);
        } catch (Throwable) {
            return response()->json([
                'success' => false,
                'message' => 'Could not mark notifications as read.',
            ], 500);
        }
    }
}
