<?php

declare(strict_types=1);

use App\Http\Controllers\Api\V1\Public\AuthController;
use Illuminate\Support\Facades\Route;

Route::prefix('auth')
    ->group(function (): void {
        Route::post('/forgot-password', [AuthController::class, 'forgotPassword']);
        Route::post('/reset-password', [AuthController::class, 'resetPassword']);
        Route::get('/email/verify/{id}/{hash}', [AuthController::class, 'verifyEmail'])
            ->middleware('signed')
            ->name('verification.verify');
    });
