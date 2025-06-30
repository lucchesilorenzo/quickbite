<?php

use App\Http\Controllers\Customer\CartController;
use Illuminate\Support\Facades\Route;

Route::prefix('carts')->middleware(['auth:sanctum', 'role:customer'])->group(function () {
  Route::get('/{cart}', [CartController::class, 'getCart']);
  Route::post('/', [CartController::class, 'createOrUpdateCart']);
  Route::delete('/{cart}', [CartController::class, 'deleteCart']);
});
