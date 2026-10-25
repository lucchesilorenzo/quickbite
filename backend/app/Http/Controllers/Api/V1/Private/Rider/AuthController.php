<?php

declare(strict_types=1);

namespace App\Http\Controllers\Api\V1\Private\Rider;

use App\Exceptions\Private\InvalidCredentialsException;
use App\Exceptions\Private\Rider\UnauthorizedException;
use App\Exceptions\Public\LocationNotFoundException;
use App\Http\Controllers\Controller;
use App\Http\Requests\Api\V1\Private\Rider\Auth\LoginRequest;
use App\Http\Requests\Api\V1\Private\Rider\Auth\LogoutRequest;
use App\Http\Requests\Api\V1\Private\Rider\Auth\RegisterRequest;
use App\Services\Private\Rider\AuthService;
use Dedoc\Scramble\Attributes\Endpoint;
use Dedoc\Scramble\Attributes\Group;
use Dedoc\Scramble\Attributes\IgnoreResponse;
use Dedoc\Scramble\Attributes\Response;
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
     *
     * @unauthenticated
     */
    #[Endpoint(
        operationId: 'registerRider',
        title: 'Register rider',
        description: 'Create a new rider account and return access and refresh tokens.',
        method: 'POST'
    )]
    #[IgnoreResponse(200)]
    #[Response(
        status: 201,
        description: 'Rider registered successfully.',
    )]
    #[Response(
        status: 404,
        description: 'Location not found.',
    )]
    #[Response(
        status: 409,
        description: 'Email already exists.',
    )]
    #[Response(
        status: 500,
        description: 'An unexpected error occurred while registering the rider.',
    )]
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
            ], 404);
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
     *
     * @unauthenticated
     */
    #[Endpoint(
        operationId: 'loginRider',
        title: 'Login rider',
        description: 'Authenticate a rider with email and password and return access and refresh tokens.',
        method: 'POST'
    )]
    #[Response(
        status: 200,
        description: 'Rider logged in successfully.',
    )]
    #[Response(
        status: 500,
        description: 'An unexpected error occurred while logging in the rider.',
    )]
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
    #[Endpoint(
        operationId: 'logoutRider',
        title: 'Logout rider',
        description: 'Revoke the current refresh token for the authenticated rider.',
        method: 'POST'
    )]
    #[Response(
        status: 200,
        description: 'Rider logged out successfully.',
    )]
    #[Response(
        status: 500,
        description: 'An unexpected error occurred while logging out the rider.',
    )]
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
