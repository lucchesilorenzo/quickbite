<?php

declare(strict_types=1);

namespace App\Http\Controllers\Api\V1\Private\Partner;

use App\Exceptions\Public\LocationNotFoundException;
use App\Http\Controllers\Controller;
use App\Http\Requests\Api\V1\Private\Partner\Profile\UpdateProfileGeneralInformationRequest;
use App\Http\Requests\Api\V1\Private\Partner\Profile\UpdateProfileNotificationsRequest;
use App\Http\Resources\Api\V1\UserResource;
use App\Services\Private\Partner\ProfileService;
use Dedoc\Scramble\Attributes\Endpoint;
use Dedoc\Scramble\Attributes\Group;
use Dedoc\Scramble\Attributes\Response;
use Illuminate\Http\JsonResponse;
use Throwable;

#[Group('Partner Profile')]
class ProfileController extends Controller
{
    public function __construct(
        private readonly ProfileService $profileService
    ) {}

    /**
     * Update profile's general information.
     */
    #[Endpoint(
        operationId: 'updatePartnerProfileGeneral',
        title: 'Update profile general information',
        description: 'Update partner profile general information.',
        method: 'PUT'
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
            $partner = $this->profileService->updateProfileGeneralInformation(
                $request->validated(),
                auth()->user()
            );

            return UserResource::make($partner)
                ->additional([
                    'success' => true,
                    'message' => 'Profile general information updated successfully.',
                ])
                ->response();
        } catch (LocationNotFoundException $e) {
            return response()->json([
                'success' => false,
                'message' => $e->getMessage(),
            ], $e->getCode());
        } catch (Throwable) {
            return response()->json([
                'success' => false,
                'message' => 'Could not update profile general information.',
            ], 500);
        }
    }

    /**
     * Update profile's notification preferences.
     */
    #[Endpoint(
        operationId: 'updatePartnerProfileNotifications',
        title: 'Update profile notification preferences',
        description: 'Update partner notification preferences.',
        method: 'PUT'
    )]
    #[Response(
        status: 200,
        description: 'Profile notification preferences updated successfully.',
    )]
    #[Response(
        status: 500,
        description: 'An unexpected error occurred while updating profile notification preferences.',
    )]
    public function updateProfileNotifications(
        UpdateProfileNotificationsRequest $request
    ): JsonResponse {
        try {
            $partner = $this->profileService->updateProfileNotifications(
                $request->validated(),
                auth()->user()
            );

            return UserResource::make($partner)
                ->additional([
                    'success' => true,
                    'message' => 'Profile notification preferences updated successfully.',
                ])
                ->response();
        } catch (Throwable) {
            return response()->json([
                'success' => false,
                'message' => 'Could not update profile notification preferences.',
            ], 500);
        }
    }
}
