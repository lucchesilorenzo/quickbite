<?php

declare(strict_types=1);

use App\Http\Controllers\Private\AuthController;
use Illuminate\Support\Facades\Route;

Route::prefix('auth')
    ->middleware('auth:sanctum')
    ->group(function (): void {
        Route::get('/me', [AuthController::class, 'me']);
    });
