<?php

declare(strict_types=1);

use App\Http\Controllers\Partner\AuthController;
use Illuminate\Support\Facades\Route;

Route::prefix('partner')->group(function () {
    Route::prefix('auth')->group(function () {
        Route::post('register', [AuthController::class, 'register']);
        Route::post('login', [AuthController::class, 'login']);
        Route::post('logout', [AuthController::class, 'logout'])->middleware(['auth:sanctum', 'role:partner']);
    });
});
