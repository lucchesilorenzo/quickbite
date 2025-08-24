<?php

declare(strict_types=1);

use App\Http\Controllers\Partner\PartnerAuthController;
use App\Http\Controllers\Partner\PartnerOrderController;
use App\Http\Controllers\Partner\PartnerRestaurantController;
use App\Http\Controllers\Partner\PartnerRestaurantOfferController;
use App\Http\Controllers\Partner\PartnerRestaurantReviewController;
use Illuminate\Support\Facades\Route;

Route::prefix('partner')->group(function () {
    // === AUTH ===
    Route::prefix('auth')->group(function () {
        Route::post('/register', [PartnerAuthController::class, 'register']);
        Route::post('/login', [PartnerAuthController::class, 'login']);
        Route::post('/logout', [PartnerAuthController::class, 'logout'])->middleware(['auth:sanctum', 'role:partner']);
    });

    // === RESTAURANTS ===
    Route::prefix('restaurants')->middleware(['auth:sanctum', 'role:partner'])->group(function () {
        Route::get('/', [PartnerRestaurantController::class, 'getRestaurants']);
        Route::get('/{restaurant}', [PartnerRestaurantController::class, 'getRestaurant']);

        // Settings & Info
        Route::post('/{restaurant}/info', [PartnerRestaurantController::class, 'updateRestaurantInfo']);
        Route::patch('/{restaurant}/status', [PartnerRestaurantController::class, 'updateRestaurantStatus']);
        Route::patch('/{restaurant}/settings/fees', [PartnerRestaurantController::class, 'updateRestaurantFees']);
        Route::patch('/{restaurant}/settings/delivery-times', [PartnerRestaurantController::class, 'updateRestaurantDeliveryTimes']);

        // Offers
        Route::get('/{restaurant}/offers', [PartnerRestaurantOfferController::class, 'getRestaurantOffers']);
        Route::post('/{restaurant}/offers', [PartnerRestaurantOfferController::class, 'createRestaurantOffer']);
        Route::patch('/{restaurant}/offers/{offer}', [PartnerRestaurantOfferController::class, 'updateRestaurantOffer']);
        Route::delete('/offers/{offer}', [PartnerRestaurantOfferController::class, 'deleteRestaurantOffer']);

        // Reviews
        Route::get('/{restaurant}/reviews', [PartnerRestaurantReviewController::class, 'getRestaurantReviews']);

        // Menu Categories
        Route::post('/{restaurant}/menu/categories', [PartnerRestaurantController::class, 'createRestaurantMenuCategory']);
        Route::patch('/menu/categories/order', [PartnerRestaurantController::class, 'updateRestaurantMenuCategoriesOrder']);
        Route::patch('/menu/categories/{menuCategory}', [PartnerRestaurantController::class, 'updateRestaurantMenuCategory']);
        Route::delete('/menu/categories/{menuCategory}', [PartnerRestaurantController::class, 'deleteRestaurantMenuCategory']);

        // Menu Items
        Route::post('/menu/categories/{menuCategory}/items', [PartnerRestaurantController::class, 'createRestaurantMenuItem']);
        Route::post('/menu/items/{menuItem}', [PartnerRestaurantController::class, 'updateRestaurantMenuItem']);
        Route::patch('/menu/items/order', [PartnerRestaurantController::class, 'updateRestaurantMenuItemsOrder']);
        Route::delete('/menu/items/{menuItem}', [PartnerRestaurantController::class, 'deleteRestaurantMenuItem']);

        // === ORDERS MANAGEMENT ===
        Route::get('/{restaurant}/orders', [PartnerOrderController::class, 'getOrders']);
        Route::patch('/orders/{order}/status', [PartnerOrderController::class, 'updateOrderStatus']);
    });
});
