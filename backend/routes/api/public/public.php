<?php

declare(strict_types=1);

use App\Http\Controllers\CategoryController;
use App\Http\Controllers\RestaurantController;
use App\Http\Controllers\RestaurantMenuController;
use App\Http\Controllers\RestaurantOfferController;
use App\Http\Controllers\RestaurantReviewController;
use Illuminate\Support\Facades\Route;

// === RESTAURANTS ===
Route::prefix('restaurants')->group(function () {
    Route::get('/', [RestaurantController::class, 'getRestaurants']);
    Route::get('/{restaurantSlug}', [RestaurantController::class, 'getRestaurant']);

    // Reviews
    Route::get('/{restaurant}/reviews', [RestaurantReviewController::class, 'getRestaurantReviews']);

    // Offers
    Route::get('/{restaurant}/offers', [RestaurantOfferController::class, 'getRestaurantOffers']);

    // Menu
    Route::get('/{restaurant}/menu', [RestaurantMenuController::class, 'getRestaurantMenu']);

    // Logo
    Route::get('/{restaurant}/base64-logo', [RestaurantController::class, 'getBase64Logo']);
});

// === CATEGORIES ===
Route::prefix('categories')->group(function () {
    Route::get('/', [CategoryController::class, 'getCategories']);
});
