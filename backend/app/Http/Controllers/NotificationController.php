<?php

declare(strict_types=1);

namespace App\Http\Controllers;

use App\Services\Private\NotificationService;
use Illuminate\Http\JsonResponse;
use Throwable;

class NotificationController extends Controller
{
    public function __construct(
        private NotificationService $notificationService
    ) {}

    public function getNotifications(): JsonResponse
    {
        try {
            $notifications = $this->notificationService->getNotifications(
                auth()->user()
            );

            return response()->json($notifications, 200);
        } catch (Throwable $e) {
            return response()->json([
                'message' => 'Could not get notifications.',
            ], 500);
        }
    }
}
