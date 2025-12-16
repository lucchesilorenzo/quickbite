<?php

declare(strict_types=1);

namespace App\Http\Controllers\Private\Rider;

use App\Exceptions\Public\LocationNotFoundException;
use App\Http\Controllers\Controller;
use App\Http\Requests\Private\Rider\Profile\UpdateProfileGeneralInformationRequest;
use App\Services\Private\Rider\ProfileService;
use Dedoc\Scramble\Attributes\Group;
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
    public function updateProfileGeneralInformation(
        UpdateProfileGeneralInformationRequest $request
    ): JsonResponse {
        try {
            $rider = $this->profileService->updateProfileGeneralInformation(
                $request->validated(),
                auth()->user()
            );

            return response()->json([
                'success' => true,
                'message' => 'Profile general information updated successfully.',
                'rider' => $rider,
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
}
