<?php

declare(strict_types=1);

namespace App\Http\Controllers\Api\V1\Private\Partner;

use App\Http\Controllers\Controller;
use App\Http\Requests\Api\V1\Private\Partner\Staff\GetStaffRequest;
use App\Http\Resources\Api\V1\UserResource;
use App\Models\Restaurant;
use App\Models\User;
use App\Services\Private\Partner\StaffService;
use Dedoc\Scramble\Attributes\Endpoint;
use Dedoc\Scramble\Attributes\Group;
use Dedoc\Scramble\Attributes\Response;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Gate;
use Throwable;

#[Group('Partner Staff')]
class StaffController extends Controller
{
    public function __construct(
        private readonly StaffService $staffService
    ) {}

    /**
     * Get staff members.
     */
    #[Endpoint(
        operationId: 'getPartnerStaffMembers',
        title: 'List staff members',
        description: 'List staff members for a restaurant.',
        method: 'GET'
    )]
    #[Response(
        status: 200,
        description: 'Staff members retrieved successfully.',
    )]
    #[Response(
        status: 500,
        description: 'An unexpected error occurred while retrieving staff members.',
    )]
    public function getStaffMembers(
        GetStaffRequest $request,
        Restaurant $restaurant
    ): JsonResponse {
        Gate::authorize('viewStaff', $restaurant);

        try {
            $staff = $this->staffService->getStaffMembers(
                $request->validated(),
                $restaurant
            );

            return UserResource::collection($staff)
                ->additional([
                    'success' => true,
                    'message' => 'Staff members retrieved successfully.',
                ])
                ->response();
        } catch (Throwable) {
            return response()->json([
                'success' => false,
                'message' => 'Could not get staff members.',
            ], 500);
        }
    }

    /**
     * Delete staff member.
     */
    #[Endpoint(
        operationId: 'deletePartnerStaffMember',
        title: 'Delete staff member',
        description: 'Remove a staff member from a restaurant.',
        method: 'DELETE'
    )]
    #[Response(
        status: 200,
        description: 'Staff member deleted successfully.',
    )]
    #[Response(
        status: 500,
        description: 'An unexpected error occurred while deleting staff member.',
    )]
    public function deleteStaffMember(
        Restaurant $restaurant,
        User $staffMember
    ): JsonResponse {
        Gate::authorize('deleteStaff', $restaurant);

        try {
            $this->staffService->deleteStaffMember(
                $restaurant,
                $staffMember
            );

            return response()->json([
                'success' => true,
                'message' => 'Staff member deleted successfully.',
            ], 200);
        } catch (Throwable) {
            return response()->json([
                'success' => false,
                'message' => 'Could not delete staff member.',
            ], 500);
        }
    }
}
