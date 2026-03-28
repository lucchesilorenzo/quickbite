<?php

declare(strict_types=1);

use App\Http\Controllers\Private\AuthController;
use App\Http\Controllers\Private\SocialAuthController;
use Illuminate\Support\Facades\Route;

Route::prefix('auth')
    ->group(function (): void {
        Route::get('/me', [AuthController::class, 'me'])->middleware('auth:sanctum');
        Route::post('/forgot-password', [AuthController::class, 'forgotPassword']);
        Route::post('/reset-password', [AuthController::class, 'resetPassword']);
        Route::get('/email/verify/{id}/{hash}', [AuthController::class, 'verifyEmail'])
            ->middleware('signed')
            ->name('verification.verify');
        Route::post('/email/verification-notification', [AuthController::class, 'resendEmailVerification'])->middleware(['auth:sanctum', 'throttle:6,1']);
        Route::get('/{provider}/redirect', [SocialAuthController::class, 'redirect']);
        Route::get('/{provider}/callback', [SocialAuthController::class, 'callback']);
    });
