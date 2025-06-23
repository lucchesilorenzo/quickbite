<?php

use App\Http\Controllers\OrderController;
use Illuminate\Support\Facades\Route;

Route::prefix('orders')->middleware(['auth:sanctum', 'role:customer'])->group(function () {
  Route::post('/', [OrderController::class, 'createOrder']);
});
