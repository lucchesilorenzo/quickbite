<?php

declare(strict_types=1);

use App\Http\Controllers\Private\Rider\AuthController;
use Illuminate\Support\Facades\Route;

Route::prefix('rider')->group(function (): void {
    // === AUTH ===
    Route::prefix('auth')->group(function (): void {
        Route::post('/register', [AuthController::class, 'register']);
    });
});
