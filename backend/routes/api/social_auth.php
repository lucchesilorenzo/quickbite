<?php

declare(strict_types=1);

use App\Http\Controllers\Api\SocialAuthController;
use Illuminate\Support\Facades\Route;

Route::prefix('auth')
    ->group(function (): void {
        Route::get('/{provider}/redirect', [SocialAuthController::class, 'redirect']);
        Route::get('/{provider}/callback', [SocialAuthController::class, 'callback']);
    });
