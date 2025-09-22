<?php

declare(strict_types=1);

namespace App\Http\Controllers\Private\Customer;

use App\Http\Controllers\Controller;
use App\Http\Requests\Private\Customer\Auth\CustomerLoginRequest;
use App\Http\Requests\Private\Customer\Auth\CustomerRegisterRequest;
use App\Services\Customer\CustomerAuthService;
use Exception;
use Illuminate\Http\JsonResponse;
use Throwable;

class CustomerAuthController extends Controller
{
    public function __construct(
        private CustomerAuthService $customerAuthService
    ) {}

    /**
     * Register a new customer.
     */
    public function register(CustomerRegisterRequest $request): JsonResponse
    {
        $data = $request->validated();

        try {
            $token = $this->customerAuthService->register($data);

            return response()->json([
                'message' => 'Customer registered successfully.',
                'token' => $token,
            ], 201);
        } catch (Throwable $e) {
            if ($e->getCode() === '23505') {
                return response()->json([
                    'message' => 'Customer already exists.',
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
    public function login(CustomerLoginRequest $request): JsonResponse
    {
        $data = $request->validated();

        try {
            $token = $this->customerAuthService->login($data);

            return response()->json([
                'message' => 'Customer logged in successfully.',
                'token' => $token,
            ], 200);
        } catch (Exception $e) {
            return response()->json([
                'message' => $e->getMessage(),
            ], $e->getCode());
        } catch (Throwable $e) {
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
            auth()->user()->currentAccessToken()->delete();

            return response()->json([
                'message' => 'Customer logged out successfully.',
            ], 200);
        } catch (Throwable $e) {
            return response()->json([
                'message' => 'Could not logout customer.',
            ], 500);
        }
    }
}
