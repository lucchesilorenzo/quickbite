<?php

declare(strict_types=1);

namespace App\Http\Controllers\Api\V1\Private\Rider;

use App\Exceptions\Public\LocationNotFoundException;
use App\Http\Controllers\Controller;
use App\Http\Requests\Api\V1\Private\Rider\Profile\UpdateProfileGeneralInformationRequest;
use App\Http\Requests\Api\V1\Private\Rider\Profile\UpdateProfileNotificationsRequest;
use App\Http\Resources\Api\V1\UserResource;
use App\Services\Private\Rider\ProfileService;
use Dedoc\Scramble\Attributes\Endpoint;
use Dedoc\Scramble\Attributes\Group;
use Dedoc\Scramble\Attributes\Response;
use Illuminate\Http\JsonResponse;
use Throwable;

#[Group('Rider Profile')]
class ProfileController extends Controller
{
    public function __construct(
        private readonly ProfileService $profileService
    ) {}

    /**
     * Update profile's general information.
     */
    #[Endpoint(
        operationId: 'updateRiderProfileGeneralInformation',
        title: 'Update profile general information',
        description: 'Update general information for the authenticated rider.',
        method: 'PATCH'
    )]
    #[Response(
        status: 200,
        description: 'Profile general information updated successfully.',
    )]
    #[Response(
        status: 404,
        description: 'Location not found.',
    )]
    #[Response(
        status: 500,
        description: 'An unexpected error occurred while updating profile general information.',
    )]
    public function updateProfileGeneralInformation(
        UpdateProfileGeneralInformationRequest $request
    ): JsonResponse {
        try {
            $rider = $this->profileService->updateProfileGeneralInformation(
                $request->validated(),
                auth()->user()
            );

            return UserResource::make($rider)
                ->additional([
                    'success' => true,
                    'message' => __('messages.rider.profile.general_info_updated'),
                ])
                ->response();
        } catch (LocationNotFoundException $e) {
            return response()->json([
                'success' => false,
                'message' => $e->getMessage(),
            ], 404);
        } catch (Throwable) {
            return response()->json([
                'success' => false,
                'message' => __('messages.rider.profile.could_not_update_general_info'),
            ], 500);
        }
    }

    /**
     * Update profile's notification preferences.
     */
    #[Endpoint(
        operationId: 'updateRiderProfileNotifications',
        title: 'Update profile notifications',
        description: 'Update notification preferences for the authenticated rider.',
        method: 'PATCH'
    )]
    #[Response(
        status: 200,
        description: 'Profile notifications updated successfully.',
    )]
    #[Response(
        status: 500,
        description: 'An unexpected error occurred while updating profile notification preferences.',
    )]
    public function updateProfileNotifications(
        UpdateProfileNotificationsRequest $request
    ): JsonResponse {
        try {
            $rider = $this->profileService->updateProfileNotifications(
                $request->validated(),
                auth()->user()
            );

            return UserResource::make($rider)
                ->additional([
                    'success' => true,
                    'message' => __('messages.rider.profile.notifications_updated'),
                ])
                ->response();
        } catch (Throwable) {
            return response()->json([
                'success' => false,
                'message' => __('messages.rider.profile.could_not_update_notification_preferences'),
            ], 500);
        }
    }
}
