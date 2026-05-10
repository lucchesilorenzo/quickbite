<?php

declare(strict_types=1);

namespace App\Http\Controllers\Api\V1\Private\Partner;

use App\Http\Controllers\Controller;
use App\Models\Restaurant;
use App\Services\Private\Partner\StaffService;
use Dedoc\Scramble\Attributes\Group;
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
     * Get staff.
     */
    public function getStaffMembers(Restaurant $restaurant): JsonResponse
    {
        Gate::authorize('viewStaff', $restaurant);

        try {
            $staff = $this->staffService->getStaffMembers(
                $restaurant
            );

            return response()->json([
                'success' => true,
                'message' => 'Staff members retrieved successfully.',
                'staff' => $staff,
            ], 200);
        } catch (Throwable) {
            return response()->json([
                'success' => false,
                'message' => 'Could not get staff members.',
            ], 500);
        }
    }
}
