<?php

declare(strict_types=1);

namespace App\Http\Controllers\Private;

use App\Http\Controllers\Controller;
use App\Services\Private\AuthService;
use Dedoc\Scramble\Attributes\Group;
use Illuminate\Http\JsonResponse;
use Throwable;

#[Group('Private Auth')]
class AuthController extends Controller
{
    public function __construct(
        private readonly AuthService $authService
    ) {}

    /**
     * Get the authenticated user.
     */
    public function me(): JsonResponse
    {
        try {
            $user = $this->authService->me(
                auth()->user()
            );

            return response()->json([
                'success' => true,
                'message' => 'User retrieved successfully.',
                'user' => $user,
            ], 200);
        } catch (Throwable) {
            return response()->json([
                'success' => false,
                'message' => 'Could not get user.',
            ], 500);
        }
    }
}
