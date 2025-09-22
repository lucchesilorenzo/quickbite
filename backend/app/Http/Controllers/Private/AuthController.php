<?php

declare(strict_types=1);

namespace App\Http\Controllers\Private;

use App\Http\Controllers\Controller;
use App\Services\Private\AuthService;
use Illuminate\Http\JsonResponse;
use Throwable;

class AuthController extends Controller
{
    public function __construct(
        private AuthService $authService
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

            return response()->json($user, 200);
        } catch (Throwable $e) {
            return response()->json([
                'message' => 'Could not get user.',
            ], 500);
        }
    }
}
