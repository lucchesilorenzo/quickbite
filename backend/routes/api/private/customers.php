<?php

declare(strict_types=1);

use App\Http\Controllers\Customer\CustomerAuthController;
use App\Http\Controllers\Customer\CustomerCartController;
use App\Http\Controllers\Customer\CustomerOrderController;
use App\Http\Controllers\Customer\CustomerProfileController;
use App\Http\Controllers\Customer\CustomerRestaurantController;
use App\Http\Controllers\Customer\ProfileController;
use App\Http\Controllers\CustomerOrderController;
use Illuminate\Support\Facades\Route;

Route::prefix('customer')->group(function () {
    // === AUTH ===
    Route::prefix('auth')->group(function () {
        Route::post('/register', [CustomerAuthController::class, 'register']);
        Route::post('/login', [CustomerAuthController::class, 'login']);
        Route::post('/logout', [CustomerAuthController::class, 'logout'])->middleware(['auth:sanctum', 'role:customer']);
    });

    // === RESTAURANTS ===
    Route::prefix('restaurants')->middleware(['auth:sanctum', 'role:customer'])->group(function () {
        Route::post('/{restaurantSlug}/reviews', [CustomerRestaurantController::class, 'createCustomerReview']);
    });

    // === PROFILE MANAGEMENT ===
    Route::prefix('profile')->middleware(['auth:sanctum', 'role:customer'])->group(function () {
        Route::patch('/', [ProfileController::class, 'updateProfile']);
    });

    // === CARTS MANAGEMENT ===
    Route::prefix('carts')->middleware(['auth:sanctum', 'role:customer'])->group(function () {
        Route::get('/', [CustomerCartController::class, 'getCarts']);
        Route::get('/{cart}', [CustomerCartController::class, 'getCart']);
        Route::post('/bulk', [CustomerCartController::class, 'createOrUpdateCarts']);
        Route::post('/', [CustomerCartController::class, 'createOrUpdateCart']);
        Route::delete('/{cart}', [CustomerCartController::class, 'deleteCart']);
    });

    // === ORDERS MANAGEMENT ===
    Route::prefix('orders')->middleware(['auth:sanctum', 'role:customer'])->group(function () {
        Route::get('/', [CustomerOrderController::class, 'getOrders']);
        Route::get('/{order}', [CustomerOrderController::class, 'getOrder']);
        Route::post('/', [CustomerOrderController::class, 'createOrder']);
    });
});
