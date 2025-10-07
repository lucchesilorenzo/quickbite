<?php

declare(strict_types=1);

namespace App\Http\Controllers\Private\Customer;

use App\Exceptions\Public\LocationNotFoundException;
use App\Http\Controllers\Controller;
use App\Http\Requests\Private\Customer\Profile\CustomerUpdateAddressInfoRequest;
use App\Http\Requests\Private\Customer\Profile\CustomerUpdatePersonalInfoRequest;
use App\Services\Private\Customer\CustomerProfileService;
use Illuminate\Http\JsonResponse;
use Throwable;

class CustomerProfileController extends Controller
{
    public function __construct(
        private readonly CustomerProfileService $customerProfileService
    ) {}

    /**
     * Update customer profile's personal information.
     */
    public function updatePersonalInfo(
        CustomerUpdatePersonalInfoRequest $request
    ): JsonResponse {
        try {
            $customer = $this->customerProfileService->updatePersonalInfo(
                auth()->user(),
                $request->validated()
            );

            return response()->json([
                'customer' => $customer,
                'message' => 'Personal information updated successfully.',
            ], 200);
        } catch (Throwable) {
            return response()->json([
                'message' => 'Could not update personal information.',
            ], 500);
        }
    }

    /**
     * Update customer profile's address information.
     */
    public function updateAddressInfo(
        CustomerUpdateAddressInfoRequest $request
    ): JsonResponse {
        try {
            $customer = $this->customerProfileService->updateAddressInfo(
                auth()->user(),
                $request->validated()
            );

            return response()->json([
                'customer' => $customer,
                'message' => 'Address information updated successfully.',
            ], 200);
        } catch (LocationNotFoundException $e) {
            return response()->json([
                'message' => $e->getMessage(),
            ], $e->getCode());
        } catch (Throwable) {
            return response()->json([
                'message' => 'Could not update address information.',
            ], 500);
        }
    }
}
