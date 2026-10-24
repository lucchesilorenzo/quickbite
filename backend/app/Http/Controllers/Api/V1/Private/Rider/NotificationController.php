<?php

declare(strict_types=1);

namespace App\Http\Controllers\Api\V1\Private\Rider;

use App\Http\Controllers\Controller;
use App\Http\Resources\Api\V1\NotificationResource;
use App\Services\Private\Rider\NotificationService;
use Dedoc\Scramble\Attributes\Endpoint;
use Dedoc\Scramble\Attributes\Group;
use Dedoc\Scramble\Attributes\Response;
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
    #[Endpoint(
        operationId: 'getRiderNotifications',
        title: 'List notifications',
        description: 'List notifications for the authenticated rider.',
        method: 'GET'
    )]
    #[Response(
        status: 200,
        description: 'Notifications retrieved successfully.',
    )]
    #[Response(
        status: 500,
        description: 'An unexpected error occurred while retrieving notifications.',
    )]
    public function getNotifications(): JsonResponse
    {
        try {
            $notificationsData = $this->notificationService->getNotifications(
                auth()->user()
            );

            return NotificationResource::collection($notificationsData['notifications'])
                ->additional([
                    'success' => true,
                    'message' => 'Notifications retrieved successfully.',
                    'unread_count' => $notificationsData['unread_count'],
                ])
                ->response();
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
    #[Endpoint(
        operationId: 'markRiderNotificationsAsRead',
        title: 'Mark notifications as read',
        description: 'Mark all notifications as read for the authenticated rider.',
        method: 'PUT'
    )]
    #[Response(
        status: 200,
        description: 'Notifications successfully marked as read.',
    )]
    #[Response(
        status: 500,
        description: 'An unexpected error occurred while marking notifications as read.',
    )]
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
