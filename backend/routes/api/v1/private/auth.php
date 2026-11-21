<?php

declare(strict_types=1);

use App\Http\Controllers\Api\V1\Private\AuthController;
use Illuminate\Support\Facades\Route;

Route::prefix('auth')
    ->group(function (): void {
        Route::get('/me', [AuthController::class, 'me'])->middleware('auth:sanctum');
        Route::post('/refresh', [AuthController::class, 'refresh'])->middleware('throttle:10,1');
        Route::post('/email/verification-notification', [AuthController::class, 'resendEmailVerification'])->middleware(['auth:sanctum', 'throttle:6,1']);
    });
