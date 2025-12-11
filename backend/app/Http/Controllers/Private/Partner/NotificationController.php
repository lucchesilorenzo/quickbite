<?php

declare(strict_types=1);

namespace App\Http\Controllers\Private\Partner;

use App\Http\Controllers\Controller;
use App\Models\Restaurant;
use App\Services\Private\Partner\NotificationService;
use Illuminate\Http\JsonResponse;
use Throwable;

class NotificationController extends Controller
{
    public function __construct(
        private readonly NotificationService $notificationService,
    ) {}

    public function getNotifications(Restaurant $restaurant): JsonResponse
    {
        try {
            $notificationsData = $this->notificationService->getNotifications(
                $restaurant,
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

    public function markNotificationsAsRead(Restaurant $restaurant): JsonResponse
    {
        try {
            $this->notificationService->markNotificationsAsRead(
                $restaurant,
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
