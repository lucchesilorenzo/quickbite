<?php

declare(strict_types=1);

namespace App\Http\Controllers\Private\Customer;

use App\Exceptions\Private\Customer\UnauthorizedException;
use App\Exceptions\Private\InvalidCredentialsException;
use App\Http\Controllers\Controller;
use App\Http\Requests\Private\Customer\Auth\LoginRequest;
use App\Http\Requests\Private\Customer\Auth\RegisterRequest;
use App\Services\Private\Customer\AuthService;
use Illuminate\Http\JsonResponse;
use Throwable;

class AuthController extends Controller
{
    public function __construct(
        private readonly AuthService $authService
    ) {}

    /**
     * Register a new customer.
     */
    public function register(RegisterRequest $request): JsonResponse
    {
        try {
            $token = $this->authService->register(
                $request->validated()
            );

            return response()->json([
                'message' => 'Customer registered successfully.',
                'token' => $token,
            ], 201);
        } catch (Throwable $e) {
            if ($e->getCode() === '23505') {
                return response()->json([
                    'message' => 'User already exists.',
                ], 409);
            }

            return response()->json([
                'message' => 'Could not register customer.',
            ], 500);
        }
    }

    /**
     * Login a customer.
     */
    public function login(LoginRequest $request): JsonResponse
    {
        try {
            $token = $this->authService->login(
                $request->validated()
            );

            return response()->json([
                'token' => $token,
                'message' => 'Customer logged in successfully.',
            ], 200);
        } catch (InvalidCredentialsException|UnauthorizedException $e) {
            return response()->json([
                'message' => $e->getMessage(),
            ], $e->getCode());
        } catch (Throwable) {
            return response()->json([
                'message' => 'Could not login customer.',
            ], 500);
        }
    }

    /**
     * Logout a customer.
     */
    public function logout(): JsonResponse
    {
        try {
            $this->authService->logout(
                auth()->user()
            );

            return response()->json([
                'message' => 'Customer logged out successfully.',
            ], 200);
        } catch (Throwable) {
            return response()->json([
                'message' => 'Could not logout customer.',
            ], 500);
        }
    }
}
