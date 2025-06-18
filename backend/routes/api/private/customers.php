<?php

use App\Http\Controllers\Customer\AuthController;
use Illuminate\Support\Facades\Route;

Route::prefix('customer')
  // ->middleware(['auth:sanctum', 'role:customer'])
  ->group(function () {
    Route::prefix('auth')->group(function () {
      Route::post('register', [AuthController::class, 'register']);
    });
  });
