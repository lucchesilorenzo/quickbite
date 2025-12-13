<?php

declare(strict_types=1);

namespace App\Http\Controllers\Private\Partner;

use App\Exceptions\Private\InvalidCredentialsException;
use App\Exceptions\Private\Partner\UnauthorizedException;
use App\Exceptions\Public\LocationNotFoundException;
use App\Http\Controllers\Controller;
use App\Http\Requests\Private\Partner\Auth\LoginRequest;
use App\Http\Requests\Private\Partner\Auth\RegisterRequest;
use App\Services\Private\Partner\AuthService;
use Dedoc\Scramble\Attributes\Group;
use Illuminate\Http\JsonResponse;
use Throwable;

#[Group('Partner Auth')]
class AuthController extends Controller
{
    public function __construct(
        private readonly AuthService $authService,
    ) {}

    /**
     * Register a new partner.
     */
    public function register(RegisterRequest $request): JsonResponse
    {
        try {
            $token = $this->authService->register(
                $request->validated()
            );

            return response()->json([
                'success' => true,
                'message' => 'Partner registered successfully.',
                'token' => $token,
            ], 201);
        } catch (LocationNotFoundException $e) {
            return response()->json([
                'success' => false,
                'message' => $e->getMessage(),
            ], $e->getCode());
        } catch (Throwable $e) {
            if ($e->getCode() === '23505') {
                return response()->json([
                    'success' => false,
                    'message' => 'User already exists.',
                ], 409);
            }

            return response()->json([
                'success' => false,
                'message' => 'Could not register partner.',
            ], 500);
        }
    }

    /**
     * Login a partner.
     */
    public function login(LoginRequest $request): JsonResponse
    {
        try {
            $token = $this->authService->login(
                $request->validated()
            );

            return response()->json([
                'success' => true,
                'message' => 'Partner logged in successfully.',
                'token' => $token,
            ], 200);
        } catch (InvalidCredentialsException|UnauthorizedException $e) {
            return response()->json([
                'success' => false,
                'message' => $e->getMessage(),
            ], $e->getCode());
        } catch (Throwable) {
            return response()->json([
                'success' => false,
                'message' => 'Could not login partner.',
            ], 500);
        }
    }

    /**
     * Logout a partner.
     */
    public function logout(): JsonResponse
    {
        try {
            $this->authService->logout(
                auth()->user()
            );

            return response()->json([
                'success' => true,
                'message' => 'Partner logged out successfully.',
            ], 200);
        } catch (Throwable) {
            return response()->json([
                'success' => false,
                'message' => 'Could not logout partner.',
            ], 500);
        }
    }
}
