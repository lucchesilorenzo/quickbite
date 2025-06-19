<?php

use App\Http\Controllers\Customer\AuthController;
use App\Http\Controllers\Customer\ProfileController;
use Illuminate\Support\Facades\Route;

Route::prefix('customer')->group(function () {
  Route::prefix('auth')->group(function () {
    Route::post('register', [AuthController::class, 'register']);
    Route::post('login', [AuthController::class, 'login']);
    Route::post('logout', [AuthController::class, 'logout'])->middleware(['auth:sanctum', 'role:customer']);
  });

  Route::prefix('profile')->middleware(['auth:sanctum', 'role:customer'])->group(function () {
    Route::patch('/', [ProfileController::class, 'updateProfile']);
  });
});
