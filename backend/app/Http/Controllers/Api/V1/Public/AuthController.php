<?php

declare(strict_types=1);

namespace App\Http\Controllers\Api\V1\Public;

use App\Http\Controllers\Controller;
use App\Http\Requests\Api\V1\Public\Auth\ForgotPasswordRequest;
use App\Http\Requests\Api\V1\Public\Auth\ResetPasswordRequest;
use App\Models\User;
use Dedoc\Scramble\Attributes\Endpoint;
use Dedoc\Scramble\Attributes\ExcludeRouteFromDocs;
use Dedoc\Scramble\Attributes\Group;
use Dedoc\Scramble\Attributes\IgnoreResponse;
use Dedoc\Scramble\Attributes\Response;
use Illuminate\Auth\Events\PasswordReset;
use Illuminate\Auth\Events\Verified;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Password;
use Illuminate\Support\Str;

#[Group('Public Auth')]
class AuthController extends Controller
{
    /**
     * Send an email with a link to reset the password.
     *
     * @unauthenticated
     */
    #[Endpoint(
        operationId: 'forgotPassword',
        title: 'Forgot password',
        description: 'Send a password reset link to the user email if it exists.',
        method: 'POST'
    )]
    #[Response(
        status: 200,
        description: 'If the email exists, a reset link has been sent.',
    )]
    #[Response(
        status: 429,
        description: 'Please wait before requesting another reset email.',
    )]
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
     *
     * @unauthenticated
     */
    #[Endpoint(
        operationId: 'resetPassword',
        title: 'Reset password',
        description: 'Reset the user password using a valid reset token.',
        method: 'POST'
    )]
    #[Response(
        status: 200,
        description: 'Password reset successfully.',
    )]
    #[Response(
        status: 400,
        description: 'Invalid or expired reset token, or could not reset password.',
    )]
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

    /**
     * Verify the email.
     *
     * @unauthenticated
     */
    #[ExcludeRouteFromDocs]
    #[Endpoint(
        operationId: 'verifyEmail',
        title: 'Verify email',
        description: 'Verify the user email using the signed verification link.',
        method: 'GET'
    )]
    #[IgnoreResponse(200)]
    #[Response(
        status: 302,
        description: 'Redirects to the frontend application after verification.',
    )]
    #[Response(
        status: 403,
        description: 'Invalid verification hash.',
    )]
    public function verifyEmail(string $id, string $hash): RedirectResponse
    {
        $user = User::query()->findOrFail($id);

        if (! hash_equals(sha1((string) $user->getEmailForVerification()), $hash)) {
            abort(403);
        }

        if (! $user->hasVerifiedEmail()) {
            $user->markEmailAsVerified();
            event(new Verified($user));
        }

        return redirect(config('app.frontend_url'));
    }
}
