<?php

declare(strict_types=1);

namespace App\Http\Controllers\Api\V1\Private\Customer;

use App\Exceptions\Public\LocationNotFoundException;
use App\Http\Controllers\Controller;
use App\Http\Requests\Api\V1\Private\Customer\Profile\UpdateAddressInfoRequest;
use App\Http\Requests\Api\V1\Private\Customer\Profile\UpdatePersonalInfoRequest;
use App\Http\Resources\Api\V1\UserResource;
use App\Services\Private\Customer\ProfileService;
use Dedoc\Scramble\Attributes\Endpoint;
use Dedoc\Scramble\Attributes\Group;
use Dedoc\Scramble\Attributes\Response;
use Illuminate\Http\JsonResponse;
use Throwable;

#[Group('Customer Profile')]
class ProfileController extends Controller
{
    public function __construct(
        private readonly ProfileService $profileService
    ) {}

    #[Endpoint(
        operationId: 'updateCustomerPersonalInfo',
        title: 'Update personal information',
        description: 'Update the authenticated customer personal details (name, email, phone, etc.).',
        method: 'PATCH'
    )]
    #[Response(status: 200, description: 'Personal information updated successfully.')]
    #[Response(status: 500, description: 'An unexpected error occurred while updating personal information.')]
    public function updatePersonalInfo(
        UpdatePersonalInfoRequest $request
    ): JsonResponse {
        try {
            $customer = $this->profileService->updatePersonalInfo(
                auth()->user(),
                $request->validated()
            );

            return UserResource::make($customer)
                ->additional([
                    'success' => true,
                    'message' => 'Personal information updated successfully.',
                ])
                ->response();
        } catch (Throwable) {
            return response()->json([
                'success' => false,
                'message' => 'Could not update personal information.',
            ], 500);
        }
    }

    #[Endpoint(
        operationId: 'updateCustomerAddressInfo',
        title: 'Update address information',
        description: 'Update the authenticated customer delivery address using geolocation validation.',
        method: 'PATCH'
    )]
    #[Response(status: 200, description: 'Address information updated successfully.')]
    #[Response(status: 404, description: 'The provided address could not be resolved to a valid location.')]
    #[Response(status: 500, description: 'An unexpected error occurred while updating address information.')]
    public function updateAddressInfo(
        UpdateAddressInfoRequest $request
    ): JsonResponse {
        try {
            $customer = $this->profileService->updateAddressInfo(
                auth()->user(),
                $request->validated()
            );

            return UserResource::make($customer)
                ->additional([
                    'success' => true,
                    'message' => 'Address information updated successfully.',
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
                'message' => 'Could not update address information.',
            ], 500);
        }
    }
}
