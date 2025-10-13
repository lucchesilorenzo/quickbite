<?php

declare(strict_types=1);

use App\Http\Controllers\Private\Partner\AuthController;
use App\Http\Controllers\Private\Partner\MenuCategoryController;
use App\Http\Controllers\Private\Partner\MenuItemController;
use App\Http\Controllers\Private\Partner\NotificationController;
use App\Http\Controllers\Private\Partner\OrderController;
use App\Http\Controllers\Private\Partner\ProfileController;
use App\Http\Controllers\Private\Partner\RestaurantController;
use App\Http\Controllers\Private\Partner\RestaurantMenuController;
use App\Http\Controllers\Private\Partner\RestaurantStatsController;
use App\Http\Controllers\Private\Partner\ReviewController;
use Illuminate\Support\Facades\Route;

Route::prefix('partner')->group(function () {
    // === AUTH ===
    Route::prefix('auth')->group(function () {
        Route::post('/register', [AuthController::class, 'register']);
        Route::post('/login', [AuthController::class, 'login']);
        Route::post('/logout', [AuthController::class, 'logout'])->middleware(['auth:sanctum', 'role:partner']);
    });

    // === PROFILE MANAGEMENT ===
    Route::prefix('profile')
        ->middleware(['auth:sanctum', 'role:partner'])
        ->group(function () {
            Route::patch('/general', [ProfileController::class, 'updateProfileGeneralInformation']);
            Route::patch('/notifications', [ProfileController::class, 'updateProfileNotifications']);
        });

    // === RESTAURANTS ===
    Route::prefix('restaurants')
        ->middleware(['auth:sanctum', 'role:partner'])
        ->group(function () {
            Route::get('/', [RestaurantController::class, 'getRestaurants']);
            Route::get('/{restaurant}', [RestaurantController::class, 'getRestaurant']);

            // Notifications
            Route::get('/{restaurant}/notifications', [NotificationController::class, 'getNotifications']);
            Route::post('/{restaurant}/notifications/mark-as-read', [NotificationController::class, 'markNotificationsAsRead']);

            // Settings & Info
            Route::patch('/{restaurant}/status', [RestaurantController::class, 'updateStatus']);
            Route::patch('{restaurant}/approved', [RestaurantController::class, 'updateApprovedStatus']);
            Route::post('/{restaurant}/info', [RestaurantController::class, 'updateInfo']);
            Route::patch('/{restaurant}/settings/fees', [RestaurantController::class, 'updateFees']);
            Route::patch('/{restaurant}/settings/delivery-times', [RestaurantController::class, 'updateDeliveryTimes']);

            // Offers
            Route::get('/{restaurant}/offers', [OfferController::class, 'getOffers']);
            Route::post('/{restaurant}/offers', [OfferController::class, 'createOffer']);
            Route::patch('/{restaurant}/offers/{offer}', [OfferController::class, 'updateOffer']);
            Route::delete('/offers/{offer}', [OfferController::class, 'deleteOffer']);

            // Reviews
            Route::get('/{restaurant}/reviews', [ReviewController::class, 'getReviews']);

            // Menu
            Route::get('/{restaurant}/menu', [RestaurantMenuController::class, 'getMenu']);

            // Menu Categories
            Route::post('/{restaurant}/menu/categories', [MenuCategoryController::class, 'createMenuCategory']);
            Route::patch('/menu/categories/order', [MenuCategoryController::class, 'updateMenuCategoriesOrder']);
            Route::patch('/menu/categories/{menuCategory}', [MenuCategoryController::class, 'updateMenuCategory']);
            Route::delete('/menu/categories/{menuCategory}', [MenuCategoryController::class, 'deleteMenuCategory']);

            // Menu Items
            Route::post('/menu/categories/{menuCategory}/items', [MenuItemController::class, 'createMenuItem']);
            Route::post('/menu/items/{menuItem}', [MenuItemController::class, 'updateMenuItem']);
            Route::patch('/menu/items/order', [MenuItemController::class, 'updateMenuItemsOrder']);
            Route::delete('/menu/items/{menuItem}', [MenuItemController::class, 'deleteMenuItem']);

            // Orders
            Route::get('/{restaurant}/orders', [OrderController::class, 'getOrders']);
            Route::patch('/orders/{order}/status', [OrderController::class, 'updateOrderStatus']);

            // Stats
            Route::get('/{restaurant}/stats/dashboard', [RestaurantStatsController::class, 'getDashboardStats']);
            Route::get('/{restaurant}/stats/kpis', [RestaurantStatsController::class, 'getKpiSummary']);
            Route::get('/{restaurant}/stats', [RestaurantStatsController::class, 'getStats']);
        });
});
