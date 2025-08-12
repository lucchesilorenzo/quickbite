<?php

declare(strict_types=1);

use App\Http\Controllers\Customer\CustomerAuthController;
use App\Http\Controllers\Customer\ProfileController;
use Illuminate\Support\Facades\Route;

Route::prefix('customer')->group(function () {
    Route::prefix('auth')->group(function () {
        Route::post('/register', [CustomerAuthController::class, 'register']);
        Route::post('/login', [CustomerAuthController::class, 'login']);
        Route::post('/logout', [CustomerAuthController::class, 'logout'])->middleware(['auth:sanctum', 'role:customer']);
    });

    Route::prefix('profile')->middleware(['auth:sanctum', 'role:customer'])->group(function () {
        Route::patch('/', [ProfileController::class, 'updateProfile']);
    });
});
