<?php

declare(strict_types=1);

namespace App\Http\Controllers\Api\V1\Private\Customer;

use App\Exceptions\Private\Customer\CustomerHasSocialLoginException;
use App\Exceptions\Private\Customer\UnauthorizedException;
use App\Exceptions\Private\InvalidCredentialsException;
use App\Http\Controllers\Controller;
use App\Http\Requests\Api\V1\Private\Customer\Auth\LoginRequest;
use App\Http\Requests\Api\V1\Private\Customer\Auth\LogoutRequest;
use App\Http\Requests\Api\V1\Private\Customer\Auth\RegisterRequest;
use App\Services\Private\Customer\AuthService;
use Dedoc\Scramble\Attributes\Endpoint;
use Dedoc\Scramble\Attributes\Group;
use Dedoc\Scramble\Attributes\IgnoreResponse;
use Dedoc\Scramble\Attributes\Response;
use Illuminate\Http\JsonResponse;
use Throwable;

#[Group('Customer Auth')]
class AuthController extends Controller
{
    public function __construct(
        private readonly AuthService $authService
    ) {}

    /**
     * Register a new customer.
     *
     * @unauthenticated
     */
    #[Endpoint(
        operationId: 'registerCustomer',
        title: 'Register customer',
        description: 'Create a new customer account and return access and refresh tokens.',
        method: 'POST'
    )]
    #[IgnoreResponse(200)]
    #[Response(
        status: 201,
        description: 'Customer registered successfully.',
    )]
    #[Response(
        status: 400,
        description: 'Account already uses social login and cannot be registered with email and password.',
    )]
    #[Response(
        status: 401,
        description: 'Invalid credentials or email already exists.',
    )]
    #[Response(
        status: 500,
        description: 'An unexpected error occurred while registering the customer.',
    )]
    public function register(RegisterRequest $request): JsonResponse
    {
        try {
            $tokens = $this->authService->register(
                $request->validated()
            );

            return response()->json([
                'success' => true,
                'message' => 'Customer registered successfully.',
                'access_token' => $tokens['access_token'],
                'refresh_token' => $tokens['refresh_token'],
            ], 201);
        } catch (InvalidCredentialsException $e) {
            return response()->json([
                'success' => false,
                'message' => $e->getMessage(),
            ], 401);
        } catch (CustomerHasSocialLoginException $e) {
            return response()->json([
                'success' => false,
                'message' => $e->getMessage(),
            ], 400);
        } catch (Throwable) {
            return response()->json([
                'success' => false,
                'message' => 'Could not register customer.',
            ], 500);
        }
    }

    /**
     * Login a customer.
     *
     * @unauthenticated
     */
    #[Endpoint(
        operationId: 'loginCustomer',
        title: 'Login customer',
        description: 'Authenticate a customer with email and password and return access and refresh tokens.',
        method: 'POST'
    )]
    #[Response(
        status: 200,
        description: 'Customer logged in successfully.',
    )]
    #[Response(
        status: 400,
        description: 'Account uses social login and cannot be authenticated with email and password.',
    )]
    #[Response(
        status: 401,
        description: 'Invalid email or password.',
    )]
    #[Response(
        status: 403,
        description: 'User is not authorized to log in as a customer.',
    )]
    #[Response(
        status: 500,
        description: 'An unexpected error occurred while logging in the customer.',
    )]
    public function login(LoginRequest $request): JsonResponse
    {
        try {
            $tokens = $this->authService->login(
                $request->validated()
            );

            return response()->json([
                'success' => true,
                'message' => 'Customer logged in successfully.',
                'access_token' => $tokens['access_token'],
                'refresh_token' => $tokens['refresh_token'],
            ], 200);
        } catch (InvalidCredentialsException $e) {
            return response()->json([
                'success' => false,
                'message' => $e->getMessage(),
            ], 401);
        } catch (UnauthorizedException $e) {
            return response()->json([
                'success' => false,
                'message' => $e->getMessage(),
            ], 403);
        } catch (CustomerHasSocialLoginException $e) {
            return response()->json([
                'success' => false,
                'message' => $e->getMessage(),
            ], 400);
        } catch (Throwable) {
            return response()->json([
                'success' => false,
                'message' => 'Could not login customer.',
            ], 500);
        }
    }

    /**
     * Logout a customer.
     */
    #[Endpoint(
        operationId: 'logoutCustomer',
        title: 'Logout customer',
        description: 'Revoke the current refresh token for the authenticated customer.',
        method: 'POST'
    )]
    #[Response(
        status: 200,
        description: 'Customer logged out successfully.',
    )]
    #[Response(
        status: 500,
        description: 'An unexpected error occurred while logging out the customer.',
    )]
    public function logout(LogoutRequest $request): JsonResponse
    {
        try {
            $this->authService->logout(
                auth()->user(),
                $request->validated()
            );

            return response()->json([
                'success' => true,
                'message' => 'Customer logged out successfully.',
            ], 200);
        } catch (Throwable) {
            return response()->json([
                'success' => false,
                'message' => 'Could not logout customer.',
            ], 500);
        }
    }
}
