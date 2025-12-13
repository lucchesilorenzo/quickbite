<?php

declare(strict_types=1);

namespace App\Http\Controllers\Private\Partner;

use App\Exceptions\Public\LocationNotFoundException;
use App\Http\Controllers\Controller;
use App\Http\Requests\Private\Partner\Profile\UpdateProfileGeneralInformationRequest;
use App\Http\Requests\Private\Partner\Profile\UpdateProfileNotificationsRequest;
use App\Services\Private\Partner\ProfileService;
use Dedoc\Scramble\Attributes\Group;
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
    public function updateProfileGeneralInformation(
        UpdateProfileGeneralInformationRequest $request
    ): JsonResponse {
        try {
            $partner = $this->profileService->updateProfileGeneralInformation(
                $request->validated(),
                auth()->user()
            );

            return response()->json([
                'success' => true,
                'message' => 'Profile general information updated successfully.',
                'partner' => $partner,
            ], 200);
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
    public function updateProfileNotifications(
        UpdateProfileNotificationsRequest $request
    ): JsonResponse {
        try {
            $partner = $this->profileService->updateProfileNotifications(
                $request->validated(),
                auth()->user()
            );

            return response()->json([
                'success' => true,
                'message' => 'Profile notifications updated successfully.',
                'partner' => $partner,
            ], 200);
        } catch (Throwable) {
            return response()->json([
                'success' => false,
                'message' => 'Could not update profile notification preferences.',
            ], 500);
        }
    }
}
