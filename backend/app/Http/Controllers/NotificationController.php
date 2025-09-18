<?php

declare(strict_types=1);

namespace App\Http\Controllers;

use Illuminate\Http\JsonResponse;
use Throwable;

class NotificationController extends Controller
{
    public function getNotifications(): JsonResponse
    {
        try {
            $user = auth()->user();

            return response()->json([
                'notifications' => $user->notifications,
                'unread_count' => $user->unreadNotifications()->count(),
            ], 200);
        } catch (Throwable $e) {
            return response()->json([
                'message' => 'Could not get notifications.',
            ], 500);
        }
    }
}
