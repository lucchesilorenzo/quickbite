<?php

declare(strict_types=1);

namespace App\Http\Controllers\Api\V1\Private;

use App\Http\Controllers\Controller;
use App\Http\Requests\Api\V1\Private\Auth\RefreshRequest;
use App\Http\Resources\Api\V1\UserResource;
use App\Services\Private\AuthService;
use Dedoc\Scramble\Attributes\Endpoint;
use Dedoc\Scramble\Attributes\Group;
use Dedoc\Scramble\Attributes\Response;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Http\JsonResponse;
use Throwable;

#[Group('Private Auth')]
class AuthController extends Controller
{
    public function __construct(
        private readonly AuthService $authService
    ) {}

    /**
     * Get the authenticated user.
     */
    #[Endpoint(
        operationId: 'getAuthenticatedUser',
        title: 'Get authenticated user',
        description: 'Get the currently authenticated user with roles and notification preferences.',
        method: 'GET'
    )]
    #[Response(
        status: 200,
        description: 'User retrieved successfully.',
    )]
    #[Response(
        status: 500,
        description: 'An unexpected error occurred while retrieving the user.',
    )]
    public function me(): JsonResponse
    {
        try {
            $user = $this->authService->me(
                auth()->user()
            );

            return UserResource::make($user)
                ->additional([
                    'success' => true,
                    'message' => __('messages.auth.user_retrieved'),
                ])
                ->response();
        } catch (Throwable) {
            return response()->json([
                'success' => false,
                'message' => __('messages.auth.could_not_get_user'),
            ], 500);
        }
    }

    /**
     * Refresh a token.
     *
     * @unauthenticated
     */
    #[Endpoint(
        operationId: 'refreshToken',
        title: 'Refresh token',
        description: 'Refresh access token using a refresh token.',
        method: 'POST'
    )]
    #[Response(
        status: 200,
        description: 'Tokens refreshed successfully.',
    )]
    #[Response(
        status: 500,
        description: 'An unexpected error occurred while refreshing tokens.',
    )]
    public function refresh(RefreshRequest $request): JsonResponse
    {
        try {
            $tokens = $this->authService->refresh(
                $request->validated()
            );

            return response()->json([
                'success' => true,
                'message' => __('messages.auth.tokens_refreshed'),
                'access_token' => $tokens['access_token'],
                'refresh_token' => $tokens['refresh_token'],
            ], 200);
        } catch (ModelNotFoundException) {
            return response()->json([
                'success' => false,
                'message' => __('messages.auth.invalid_refresh_token'),
            ], 401);
        } catch (Throwable) {
            return response()->json([
                'success' => false,
                'message' => __('messages.auth.could_not_refresh_tokens'),
            ], 500);
        }
    }

    /**
     * Resend the email verification notification.
     */
    #[Endpoint(
        operationId: 'resendEmailVerification',
        title: 'Resend email verification',
        description: 'Resend the email verification notification to the authenticated user.',
        method: 'POST'
    )]
    #[Response(
        status: 200,
        description: 'Verification link resent.',
    )]
    #[Response(
        status: 400,
        description: 'Email already verified.',
    )]
    #[Response(
        status: 500,
        description: 'An unexpected error occurred while resending the verification notification.',
        type: 'array{message: string}',
    )]
    public function resendEmailVerification(): JsonResponse
    {
        if (auth()->user()->hasVerifiedEmail()) {
            return response()->json([
                'success' => false,
                'message' => __('messages.auth.email_already_verified'),
            ], 400);
        }

        auth()->user()->sendEmailVerificationNotification();

        return response()->json([
            'success' => true,
            'message' => __('messages.auth.verification_link_resent'),
        ], 200);
    }
}
