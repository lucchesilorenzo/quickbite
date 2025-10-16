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
            $notifications = $this->notificationService->getNotifications(
                $restaurant,
                auth()->user()
            );

            return response()->json($notifications, 200);
        } catch (Throwable) {
            return response()->json([
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
                'message' => 'Notifications successfully marked as read.',
            ], 200);
        } catch (Throwable) {
            return response()->json([
                'message' => 'Could not mark notifications as read.',
            ], 500);
        }
    }
}
