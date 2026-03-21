<?php

declare(strict_types=1);

namespace App\Http\Controllers\Private;

use App\Http\Controllers\Controller;
use App\Http\Requests\Public\Auth\ForgotPasswordRequest;
use App\Http\Requests\Public\Auth\ResetPasswordRequest;
use App\Models\User;
use App\Services\Private\AuthService;
use Dedoc\Scramble\Attributes\Group;
use Illuminate\Auth\Events\PasswordReset;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Password;
use Illuminate\Support\Str;
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
    public function me(): JsonResponse
    {
        try {
            $user = $this->authService->me(
                auth()->user()
            );

            return response()->json([
                'success' => true,
                'message' => 'User retrieved successfully.',
                'user' => $user,
            ], 200);
        } catch (Throwable) {
            return response()->json([
                'success' => false,
                'message' => 'Could not get user.',
            ], 500);
        }
    }

    /**
     * Send an email with a link to reset the password.
     */
    public function forgotPassword(ForgotPasswordRequest $request): JsonResponse
    {
        $status = Password::sendResetLink(
            $request->validated()
        );

        return match ($status) {
            Password::RESET_LINK_SENT => response()->json([
                'success' => true,
                'message' => 'If the email exists, a reset link has been sent.',
            ], 200),
            Password::RESET_THROTTLED => response()->json([
                'success' => false,
                'message' => 'Please wait before requesting another reset email.',
            ], 429),
            default => response()->json([
                'success' => true,
                'message' => 'If the email exists, a reset link has been sent.',
            ], 200),
        };
    }

    /**
     * Reset the password.
     */
    public function resetPassword(ResetPasswordRequest $request): JsonResponse
    {
        $status = Password::reset(
            $request->validated(),
            function (User $user, string $password): void {
                $user->forceFill([
                    'password' => Hash::make($password),
                ])->setRememberToken(Str::random(60));

                $user->save();

                event(new PasswordReset($user));
            }
        );

        return match ($status) {
            Password::PASSWORD_RESET => response()->json([
                'success' => true,
                'message' => 'Password reset successfully.',
            ], 200),
            Password::INVALID_TOKEN => response()->json([
                'success' => false,
                'message' => 'Invalid or expired reset token.',
            ], 400),
            default => response()->json([
                'success' => false,
                'message' => 'Could not reset password.',
            ], 400),
        };
    }
}
