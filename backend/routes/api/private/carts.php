<?php

use App\Http\Controllers\Customer\CartController;
use Illuminate\Support\Facades\Route;

Route::prefix('carts')->middleware(['auth:sanctum', 'role:customer'])->group(function () {
  Route::get('/', [CartController::class, 'getCarts']);
  Route::get('/{cart}', [CartController::class, 'getCart']);
  Route::post('/bulk', [CartController::class, 'createOrUpdateCarts']);
  Route::post('/', [CartController::class, 'createOrUpdateCart']);
  Route::delete('/{cart}', [CartController::class, 'deleteCart']);
});
