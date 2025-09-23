<?php

declare(strict_types=1);

namespace App\Http\Controllers\Private\Customer;

use App\Http\Controllers\Controller;
use App\Http\Requests\Private\Customer\Profile\CustomerUpdateProfileRequest;
use App\Services\Private\Customer\CustomerProfileService;
use Illuminate\Http\JsonResponse;
use Throwable;

class CustomerProfileController extends Controller
{
    public function __construct(
        private readonly CustomerProfileService $customerProfileService
    ) {}

    /**
     * Update a customer's profile.
     */
    public function updateCustomerProfile(
        CustomerUpdateProfileRequest $request
    ): JsonResponse {
        try {
            $customer = $this->customerProfileService->updateProfile(
                auth()->user(),
                $request->validated()
            );

            return response()->json([
                'customer' => $customer,
                'message' => 'Profile updated successfully.',
            ], 200);
        } catch (Throwable) {
            return response()->json([
                'message' => 'Could not update profile.',
            ], 500);
        }
    }
}
