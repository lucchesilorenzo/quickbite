<?php

declare(strict_types=1);

use App\Http\Controllers\Private\Customer\AuthController;
use App\Http\Controllers\Private\Customer\CartController;
use App\Http\Controllers\Private\Customer\OrderController;
use App\Http\Controllers\Private\Customer\ProfileController;
use App\Http\Controllers\Private\Customer\ReviewController;
use Illuminate\Support\Facades\Route;

Route::prefix('customer')->group(function (): void {
    // === AUTH ===
    Route::prefix('auth')->group(function (): void {
        Route::post('/register', [AuthController::class, 'register']);
        Route::post('/login', [AuthController::class, 'login']);
        Route::post('/logout', [AuthController::class, 'logout'])->middleware(['auth:sanctum', 'role:customer']);
    });

    // === RESTAURANTS ===
    Route::prefix('restaurants')
        ->middleware(['auth:sanctum', 'role:customer'])
        ->group(function (): void {
            Route::post('/{restaurantSlug}/reviews', [ReviewController::class, 'createReview']);
        });

    // === PROFILE MANAGEMENT ===
    Route::prefix('profile')
        ->middleware(['auth:sanctum', 'role:customer'])
        ->group(function (): void {
            Route::patch('/personal-info', [ProfileController::class, 'updatePersonalInfo']);
            Route::patch('/address-info', [ProfileController::class, 'updateAddressInfo']);
        });

    // === CARTS MANAGEMENT ===
    Route::prefix('carts')
        ->middleware(['auth:sanctum', 'role:customer'])
        ->group(function (): void {
            Route::get('/', [CartController::class, 'getCarts']);
            Route::get('/{cart}', [CartController::class, 'getCart']);
            Route::post('/bulk', [CartController::class, 'createOrUpdateCarts']);
            Route::post('/', [CartController::class, 'createOrUpdateCart']);
            Route::delete('/{cart}', [CartController::class, 'deleteCart']);
        });

    // === ORDERS MANAGEMENT ===
    Route::prefix('orders')
        ->middleware(['auth:sanctum', 'role:customer'])
        ->group(function (): void {
            Route::get('/', [OrderController::class, 'getOrders']);
            Route::get('/{order}', [OrderController::class, 'getOrder']);
            Route::post('/', [OrderController::class, 'createOrder']);
        });
});
