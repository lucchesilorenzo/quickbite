<?php

declare(strict_types=1);

namespace App\Http\Controllers\Private\Partner;

use App\Exceptions\Private\Partner\PartnerInvalidCredentialsException;
use App\Exceptions\Private\Partner\PartnerUnauthorizedException;
use App\Exceptions\Public\LocationNotFoundException;
use App\Http\Controllers\Controller;
use App\Http\Requests\Private\Partner\Auth\PartnerLoginRequest;
use App\Http\Requests\Private\Partner\Auth\PartnerRegisterRequest;
use App\Services\Private\Partner\PartnerAuthService;
use Illuminate\Http\JsonResponse;
use Throwable;

class PartnerAuthController extends Controller
{
    public function __construct(
        private PartnerAuthService $partnerAuthService,
    ) {}

    /**
     * Register a new partner.
     */
    public function register(PartnerRegisterRequest $request): JsonResponse
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
            return response()->json([
                'message' => 'Could not register partner.',
            ], 500);
        }
    }

    /**
     * Login a partner.
     */
    public function login(PartnerLoginRequest $request): JsonResponse
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
        } catch (Throwable $e) {
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
        } catch (Throwable $e) {
            return response()->json([
                'message' => 'Could not logout partner.',
            ], 500);
        }
    }
}
