<?php

use App\Http\Controllers\OrderController;
use Illuminate\Support\Facades\Route;

Route::prefix('orders')->middleware(['auth:sanctum', 'role:customer'])->group(function () {
  Route::get('/{order}', [OrderController::class, 'getOrder']);
  Route::post('/', [OrderController::class, 'createOrder']);
});
