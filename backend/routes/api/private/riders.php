<?php

declare(strict_types=1);

use App\Http\Controllers\Private\Rider\AuthController;
use App\Http\Controllers\Private\Rider\ProfileController;
use Illuminate\Support\Facades\Route;

Route::prefix('rider')->group(function (): void {
    // === AUTH ===
    Route::prefix('auth')->group(function (): void {
        Route::post('/register', [AuthController::class, 'register']);
        Route::post('/login', [AuthController::class, 'login']);
        Route::post('/logout', [AuthController::class, 'logout'])->middleware('auth:sanctum', 'role:rider');
    });

    // === PROFILE MANAGEMENT ===
    Route::prefix('profile')
        ->middleware(['auth:sanctum', 'role:rider'])
        ->group(function (): void {
            Route::patch('/general', [ProfileController::class, 'updateProfileGeneralInformation']);
            Route::patch('/notifications', [ProfileController::class, 'updateProfileNotifications']);
        });

    // === RESTAURANTS ===
    Route::prefix('restaurants')
        ->middleware(['auth:sanctum', 'role:rider'])
        ->group(function (): void {
            // TODO: Restaurants

            // TODO: Notifications
        });
});
