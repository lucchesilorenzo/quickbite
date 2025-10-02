<?php

declare(strict_types=1);

use App\Http\Controllers\Private\Partner\PartnerAuthController;
use App\Http\Controllers\Private\Partner\PartnerMenuCategoryController;
use App\Http\Controllers\Private\Partner\PartnerMenuItemController;
use App\Http\Controllers\Private\Partner\PartnerNotificationController;
use App\Http\Controllers\Private\Partner\PartnerOrderController;
use App\Http\Controllers\Private\Partner\PartnerProfileController;
use App\Http\Controllers\Private\Partner\PartnerRestaurantController;
use App\Http\Controllers\Private\Partner\PartnerRestaurantMenuController;
use App\Http\Controllers\Private\Partner\PartnerRestaurantOfferController;
use App\Http\Controllers\Private\Partner\PartnerRestaurantReviewController;
use App\Http\Controllers\Private\Partner\PartnerRestaurantStatsController;
use Illuminate\Support\Facades\Route;

Route::prefix('partner')->group(function () {
    // === AUTH ===
    Route::prefix('auth')->group(function () {
        Route::post('/register', [PartnerAuthController::class, 'register']);
        Route::post('/login', [PartnerAuthController::class, 'login']);
        Route::post('/logout', [PartnerAuthController::class, 'logout'])->middleware(['auth:sanctum', 'role:partner']);
    });

    // === PROFILE MANAGEMENT ===
    Route::prefix('profile')
        ->middleware(['auth:sanctum', 'role:partner'])
        ->group(function () {
            Route::patch('/general', [PartnerProfileController::class, 'updateProfileGeneralInformation']);
            Route::patch('/notifications', [PartnerProfileController::class, 'updateProfileNotifications']);
        });

    // === RESTAURANTS ===
    Route::prefix('restaurants')
        ->middleware(['auth:sanctum', 'role:partner'])
        ->group(function () {
            Route::get('/', [PartnerRestaurantController::class, 'getRestaurants']);
            Route::get('/{restaurant}', [PartnerRestaurantController::class, 'getRestaurant']);

            // Notifications
            Route::get('/{restaurant}/notifications', [PartnerNotificationController::class, 'getNotifications']);
            Route::post('/{restaurant}/notifications/mark-as-read', [PartnerNotificationController::class, 'markNotificationsAsRead']);

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

            // Menu
            Route::get('/{restaurant}/menu', [PartnerRestaurantMenuController::class, 'getRestaurantMenu']);

            // Menu Categories
            Route::post('/{restaurant}/menu/categories', [PartnerMenuCategoryController::class, 'createRestaurantMenuCategory']);
            Route::patch('/menu/categories/order', [PartnerMenuCategoryController::class, 'updateRestaurantMenuCategoriesOrder']);
            Route::patch('/menu/categories/{menuCategory}', [PartnerMenuCategoryController::class, 'updateRestaurantMenuCategory']);
            Route::delete('/menu/categories/{menuCategory}', [PartnerMenuCategoryController::class, 'deleteRestaurantMenuCategory']);

            // Menu Items
            Route::post('/menu/categories/{menuCategory}/items', [PartnerMenuItemController::class, 'createRestaurantMenuItem']);
            Route::post('/menu/items/{menuItem}', [PartnerMenuItemController::class, 'updateRestaurantMenuItem']);
            Route::patch('/menu/items/order', [PartnerMenuItemController::class, 'updateRestaurantMenuItemsOrder']);
            Route::delete('/menu/items/{menuItem}', [PartnerMenuItemController::class, 'deleteRestaurantMenuItem']);

            // Orders
            Route::get('/{restaurant}/orders', [PartnerOrderController::class, 'getOrders']);
            Route::patch('/orders/{order}/status', [PartnerOrderController::class, 'updateOrderStatus']);

            // Stats
            Route::get('/{restaurant}/stats/dashboard', [PartnerRestaurantStatsController::class, 'getRestaurantDashboardStats']);
            Route::get('/{restaurant}/stats/kpis', [PartnerRestaurantStatsController::class, 'getRestaurantKpiSummary']);
            Route::get('/{restaurant}/stats', [PartnerRestaurantStatsController::class, 'getRestaurantStats']);
        });
});
