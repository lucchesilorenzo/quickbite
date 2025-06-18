<?php

use App\Http\Controllers\Customer\AuthController;
use Illuminate\Support\Facades\Route;

Route::prefix('customer')->group(function () {
  Route::prefix('auth')->group(function () {
    Route::post('register', [AuthController::class, 'register']);
    Route::post('login', [AuthController::class, 'login']);
    Route::post('logout', [AuthController::class, 'logout'])->middleware(['auth:sanctum', 'role:customer']);
  });
});
