<?php

declare(strict_types=1);

use App\Http\Controllers\Private\AuthController;
use App\Http\Controllers\Private\SocialAuthController;
use Illuminate\Support\Facades\Route;

Route::prefix('auth')
    ->group(function (): void {
        Route::get('/me', [AuthController::class, 'me'])->middleware('auth:sanctum');
        Route::get('/{provider}/redirect', [SocialAuthController::class, 'redirect']);
        Route::get('/{provider}/callback', [SocialAuthController::class, 'callback']);
    });
