<?php

declare(strict_types=1);

namespace App\Http\Controllers\Private\Partner;

use App\Exceptions\Public\LocationNotFoundException;
use App\Http\Controllers\Controller;
use App\Http\Requests\Private\Partner\Profile\UpdateProfileGeneralInformationRequest;
use App\Http\Requests\Private\Partner\Profile\UpdateProfileNotificationsRequest;
use App\Services\Private\Partner\PartnerProfileService;
use Illuminate\Http\JsonResponse;
use Throwable;

class ProfileController extends Controller
{
    public function __construct(
        private readonly PartnerProfileService $partnerProfileService
    ) {}

    public function updateProfileGeneralInformation(
        UpdateProfileGeneralInformationRequest $request
    ): JsonResponse {
        try {
            $user = $this->partnerProfileService->updateProfileGeneralInformation(
                $request->validated(),
                auth()->user()
            );

            return response()->json([
                'user' => $user,
                'message' => 'Profile general information updated successfully.',
            ], 200);
        } catch (LocationNotFoundException $e) {
            return response()->json([
                'message' => $e->getMessage(),
            ], $e->getCode());
        } catch (Throwable) {
            return response()->json([
                'message' => 'Could not update profile general information.',
            ], 500);
        }
    }

    public function updateProfileNotifications(
        UpdateProfileNotificationsRequest $request
    ): JsonResponse {
        try {
            $user = $this->partnerProfileService->updateProfileNotifications(
                $request->validated(),
                auth()->user()
            );

            return response()->json([
                'user' => $user,
                'message' => 'Profile notifications updated successfully.',
            ], 200);
        } catch (Throwable) {
            return response()->json([
                'message' => 'Could not update profile notification preferences.',
            ], 500);
        }
    }
}
