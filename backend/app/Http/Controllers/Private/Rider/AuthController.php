<?php

declare(strict_types=1);

namespace App\Http\Controllers\Private\Rider;

use App\Exceptions\Private\InvalidCredentialsException;
use App\Exceptions\Private\Rider\UnauthorizedException;
use App\Exceptions\Public\LocationNotFoundException;
use App\Http\Controllers\Controller;
use App\Http\Requests\Private\Auth\Rider\LogoutRequest;
use App\Http\Requests\Private\Rider\Auth\LoginRequest;
use App\Http\Requests\Private\Rider\Auth\RegisterRequest;
use App\Services\Private\Rider\AuthService;
use Dedoc\Scramble\Attributes\Group;
use Illuminate\Http\JsonResponse;
use Throwable;

#[Group('Rider Auth')]
class AuthController extends Controller
{
    public function __construct(
        private readonly AuthService $authService
    ) {}

    /**
     * Register a new rider.
     */
    public function register(RegisterRequest $request): JsonResponse
    {
        try {
            $tokens = $this->authService->register(
                $request->validated()
            );

            return response()->json([
                'success' => true,
                'message' => 'Rider registered successfully.',
                'access_token' => $tokens['access_token'],
                'refresh_token' => $tokens['refresh_token'],
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
                    'message' => 'Email already exists.',
                ], 409);
            }

            return response()->json([
                'success' => false,
                'message' => 'Could not register rider.',
            ], 500);
        }
    }

    /**
     * Login a rider.
     */
    public function login(LoginRequest $request): JsonResponse
    {
        try {
            $tokens = $this->authService->login(
                $request->validated()
            );

            return response()->json([
                'success' => true,
                'message' => 'Rider logged in successfully.',
                'access_token' => $tokens['access_token'],
                'refresh_token' => $tokens['refresh_token'],
            ], 200);
        } catch (InvalidCredentialsException|UnauthorizedException $e) {
            return response()->json([
                'success' => false,
                'message' => $e->getMessage(),
            ], $e->getCode());
        } catch (Throwable) {
            return response()->json([
                'success' => false,
                'message' => 'Could not login rider.',
            ], 500);
        }
    }

    /**
     * Logout a rider.
     */
    public function logout(LogoutRequest $request): JsonResponse
    {
        try {
            $this->authService->logout(
                auth()->user(),
                $request->validated(),
            );

            return response()->json([
                'success' => true,
                'message' => 'Rider logged out successfully.',
            ], 200);
        } catch (Throwable) {
            return response()->json([
                'success' => false,
                'message' => 'Could not logout rider.',
            ], 500);
        }
    }
}
