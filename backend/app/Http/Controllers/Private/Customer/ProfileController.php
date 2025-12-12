<?php

declare(strict_types=1);

namespace App\Http\Controllers\Private\Customer;

use App\Exceptions\Public\LocationNotFoundException;
use App\Http\Controllers\Controller;
use App\Http\Requests\Private\Customer\Profile\UpdateAddressInfoRequest;
use App\Http\Requests\Private\Customer\Profile\UpdatePersonalInfoRequest;
use App\Services\Private\Customer\ProfileService;
use Dedoc\Scramble\Attributes\Group;
use Illuminate\Http\JsonResponse;
use Throwable;

#[Group('Customer Profile')]
class ProfileController extends Controller
{
    public function __construct(
        private readonly ProfileService $profileService
    ) {}

    /**
     * Update profile's personal information.
     */
    public function updatePersonalInfo(
        UpdatePersonalInfoRequest $request
    ): JsonResponse {
        try {
            $customer = $this->profileService->updatePersonalInfo(
                auth()->user(),
                $request->validated()
            );

            return response()->json([
                'success' => true,
                'message' => 'Personal information updated successfully.',
                'customer' => $customer,
            ], 200);
        } catch (Throwable) {
            return response()->json([
                'success' => false,
                'message' => 'Could not update personal information.',
            ], 500);
        }
    }

    /**
     * Update profile's address information.
     */
    public function updateAddressInfo(
        UpdateAddressInfoRequest $request
    ): JsonResponse {
        try {
            $customer = $this->profileService->updateAddressInfo(
                auth()->user(),
                $request->validated()
            );

            return response()->json([
                'success' => true,
                'message' => 'Address information updated successfully.',
                'customer' => $customer,
            ], 200);
        } catch (LocationNotFoundException $e) {
            return response()->json([
                'success' => false,
                'message' => $e->getMessage(),
            ], $e->getCode());
        } catch (Throwable) {
            return response()->json([
                'success' => false,
                'message' => 'Could not update address information.',
            ], 500);
        }
    }
}
