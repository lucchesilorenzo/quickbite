<?php

use App\Http\Controllers\AuthController;
use Illuminate\Support\Facades\Route;

Route::prefix('auth')->middleware('auth:sanctum')->group(function () {
  Route::get('me', [AuthController::class, 'me']);
});
