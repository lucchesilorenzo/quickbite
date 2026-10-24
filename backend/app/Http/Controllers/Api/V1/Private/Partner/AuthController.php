<?php

declare(strict_types=1);

namespace App\Http\Controllers\Api\V1\Private\Partner;

use App\Exceptions\Private\InvalidCredentialsException;
use App\Exceptions\Private\Partner\UnauthorizedException;
use App\Exceptions\Public\LocationNotFoundException;
use App\Http\Controllers\Controller;
use App\Http\Requests\Api\V1\Private\Partner\Auth\LoginRequest;
use App\Http\Requests\Api\V1\Private\Partner\Auth\LogoutRequest;
use App\Http\Requests\Api\V1\Private\Partner\Auth\RegisterRequest;
use App\Services\Private\Partner\AuthService;
use Dedoc\Scramble\Attributes\Endpoint;
use Dedoc\Scramble\Attributes\Group;
use Dedoc\Scramble\Attributes\IgnoreResponse;
use Dedoc\Scramble\Attributes\Response;
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
     *
     * @unauthenticated
     */
    #[Endpoint(
        operationId: 'registerPartner',
        title: 'Register partner',
        description: 'Create a new partner account and restaurant, returning access and refresh tokens.',
        method: 'POST'
    )]
    #[IgnoreResponse(200)]
    #[Response(
        status: 201,
        description: 'Partner registered successfully.',
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
        description: 'An unexpected error occurred while registering the partner.',
    )]
    public function register(RegisterRequest $request): JsonResponse
    {
        try {
            $tokens = $this->authService->register(
                $request->validated()
            );

            return response()->json([
                'success' => true,
                'message' => 'Partner registered successfully.',
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
                'message' => 'Could not register partner.',
            ], 500);
        }
    }

    /**
     * Login a partner.
     *
     * @unauthenticated
     */
    #[Endpoint(
        operationId: 'loginPartner',
        title: 'Login partner',
        description: 'Authenticate a partner with email and password and return access and refresh tokens.',
        method: 'POST'
    )]
    #[Response(
        status: 200,
        description: 'Partner logged in successfully.',
    )]
    #[Response(
        status: 500,
        description: 'An unexpected error occurred while logging in the partner.',
    )]
    public function login(LoginRequest $request): JsonResponse
    {
        try {
            $tokens = $this->authService->login(
                $request->validated()
            );

            return response()->json([
                'success' => true,
                'message' => 'Partner logged in successfully.',
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
                'message' => 'Could not login partner.',
            ], 500);
        }
    }

    /**
     * Logout a partner.
     */
    #[Endpoint(
        operationId: 'logoutPartner',
        title: 'Logout partner',
        description: 'Revoke the current refresh token for the authenticated partner.',
        method: 'POST'
    )]
    #[Response(
        status: 200,
        description: 'Partner logged out successfully.',
    )]
    #[Response(
        status: 500,
        description: 'An unexpected error occurred while logging out the partner.',
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
