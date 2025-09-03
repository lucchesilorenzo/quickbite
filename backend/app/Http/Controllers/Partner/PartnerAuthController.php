<?php

declare(strict_types=1);

namespace App\Http\Controllers\Partner;

use App\Enums\UserRole;
use App\Http\Controllers\Controller;
use App\Http\Requests\Partner\Auth\PartnerLoginRequest;
use App\Http\Requests\Partner\Auth\PartnerRegisterRequest;
use App\Models\User;
use App\Services\LocationService;
use App\Services\Partner\PartnerAuthService;
use Exception;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Hash;
use Throwable;

class PartnerAuthController extends Controller
{
    /**
     * Create a new controller instance.
     */
    public function __construct(
        private PartnerAuthService $partnerAuthService,
        private LocationService $locationService
    ) {}

    /**
     * Register a new partner.
     */
    public function register(PartnerRegisterRequest $request): JsonResponse
    {
        $data = $request->validated();

        try {
            $token = $this->partnerAuthService->register($data);

            return response()->json([
                'message' => 'Partner registered successfully.',
                'token' => $token,
            ], 201);
        } catch (Exception $e) {
            return response()->json([
                'message' => $e->getMessage(),
            ], $e->getCode());
        } catch (Throwable $e) {
            if ($e->getCode() === '23505') {
                return response()->json([
                    'message' => 'Partner already exists.',
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
    public function login(PartnerLoginRequest $request): JsonResponse
    {
        // Get validated data
        $data = $request->validated();

        try {
            // Get partner
            $partner = User::where('email', $data['email'])->first();

            // Check if partner exists
            if (! $partner) {
                return response()->json([
                    'message' => 'Partner not found.',
                ], 404);
            }

            // Check if partner has PARTNER role
            if (! $partner->hasRole(UserRole::PARTNER)) {
                return response()->json([
                    'message' => 'You are not authorized to log in as a partner.',
                ], 403);
            }

            // Check if password is correct
            if (! Hash::check($data['password'], $partner->password)) {
                return response()->json([
                    'message' => 'Invalid credentials.',
                ], 401);
            }

            // Generate token
            $token = $partner->createToken('partner_web_token')->plainTextToken;

            return response()->json([
                'message' => 'Partner logged in successfully.',
                'token' => $token,
            ], 200);
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
            auth()->user()->currentAccessToken()->delete();

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
