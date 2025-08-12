<?php

declare(strict_types=1);

use App\Http\Controllers\Partner\AuthController;
use App\Http\Controllers\Partner\PartnerRestaurantController;
use Illuminate\Support\Facades\Route;

Route::prefix('partner')->group(function () {
    Route::prefix('auth')->group(function () {
        Route::post('/register', [AuthController::class, 'register']);
        Route::post('/login', [AuthController::class, 'login']);
        Route::post('/logout', [AuthController::class, 'logout'])->middleware(['auth:sanctum', 'role:partner']);
    });

    Route::prefix('restaurants')->middleware(['auth:sanctum', 'role:partner'])->group(function () {
        Route::get('/', [PartnerRestaurantController::class, 'getRestaurants']);
        Route::get('/{restaurant}', [PartnerRestaurantController::class, 'getRestaurant']);

        Route::post('/{restaurant}/offers', [PartnerRestaurantController::class, 'createRestaurantOffer']);
        Route::post('/{restaurant}/info', [PartnerRestaurantController::class, 'updateRestaurantInfo']);
        Route::post('/{restaurant}/menu/categories', [PartnerRestaurantController::class, 'createRestaurantMenuCategory']);

        Route::patch('/{restaurant}/status', [PartnerRestaurantController::class, 'updateRestaurantStatus']);
        Route::patch('/{restaurant}/settings/fees', [PartnerRestaurantController::class, 'updateRestaurantFees']);
        Route::patch('/{restaurant}/settings/delivery-times', [PartnerRestaurantController::class, 'updateRestaurantDeliveryTimes']);
        Route::patch('/{restaurant}/offers/{offer}', [PartnerRestaurantController::class, 'updateRestaurantOffer']);
        Route::patch('/menu/categories/order', [PartnerRestaurantController::class, 'updateRestaurantMenuCategoriesOrder']);
        Route::patch('/menu/categories/{menuCategory}', [PartnerRestaurantController::class, 'updateRestaurantMenuCategory']);

        Route::delete('/offers/{offer}', [PartnerRestaurantController::class, 'deleteRestaurantOffer']);
        Route::delete('/menu/categories/{menuCategory}', [PartnerRestaurantController::class, 'deleteRestaurantMenuCategory']);
    });
});
