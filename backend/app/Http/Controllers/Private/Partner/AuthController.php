<?php

declare(strict_types=1);

namespace App\Http\Controllers\Private\Partner;

use App\Exceptions\Private\Partner\PartnerInvalidCredentialsException;
use App\Exceptions\Private\Partner\PartnerUnauthorizedException;
use App\Exceptions\Public\LocationNotFoundException;
use App\Http\Controllers\Controller;
use App\Http\Requests\Private\Partner\Auth\LoginRequest;
use App\Http\Requests\Private\Partner\Auth\RegisterRequest;
use App\Services\Private\Partner\PartnerAuthService;
use Illuminate\Http\JsonResponse;
use Throwable;

class AuthController extends Controller
{
    public function __construct(
        private readonly PartnerAuthService $partnerAuthService,
    ) {}

    /**
     * Register a new partner.
     */
    public function register(RegisterRequest $request): JsonResponse
    {
        try {
            $token = $this->partnerAuthService->register(
                $request->validated()
            );

            return response()->json([
                'token' => $token,
                'message' => 'Partner registered successfully.',
            ], 201);
        } catch (LocationNotFoundException $e) {
            return response()->json([
                'message' => $e->getMessage(),
            ], $e->getCode());
        } catch (Throwable $e) {
            if ($e->getCode() === '23505') {
                return response()->json([
                    'message' => 'User already exists.',
                ], 409);
            }

            return response()->json([
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
            $token = $this->partnerAuthService->login(
                $request->validated()
            );

            return response()->json([
                'token' => $token,
                'message' => 'Partner logged in successfully.',
            ], 200);
        } catch (PartnerInvalidCredentialsException|PartnerUnauthorizedException $e) {
            return response()->json([
                'message' => $e->getMessage(),
            ], $e->getCode());
        } catch (Throwable) {
            return response()->json([
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
            $this->partnerAuthService->logout(
                auth()->user()
            );

            return response()->json([
                'message' => 'Partner logged out successfully.',
            ], 200);
        } catch (Throwable) {
            return response()->json([
                'message' => 'Could not logout partner.',
            ], 500);
        }
    }
}
