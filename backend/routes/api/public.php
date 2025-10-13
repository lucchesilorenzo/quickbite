<?php

declare(strict_types=1);

use App\Http\Controllers\Public\CategoryController;
use App\Http\Controllers\Public\MenuController;
use App\Http\Controllers\Public\OfferController;
use App\Http\Controllers\Public\RestaurantController;
use App\Http\Controllers\Public\ReviewController;
use Illuminate\Support\Facades\Route;

// === RESTAURANTS ===
Route::prefix('restaurants')->group(function () {
    Route::get('/', [RestaurantController::class, 'getRestaurants']);
    Route::get('/{restaurantSlug}', [RestaurantController::class, 'getRestaurant']);

    Route::prefix('{restaurant}')->group(function () {
        Route::get('/delivery-slots', [RestaurantController::class, 'getDeliverySlots']);
        Route::get('/reviews', [ReviewController::class, 'getReviews']);
        Route::get('/offers', [OfferController::class, 'getOffers']);
        Route::get('/menu', [MenuController::class, 'getMenu']);
        Route::get('/base64-logo', [RestaurantController::class, 'getBase64Logo']);
    });
});

// === CATEGORIES ===
Route::prefix('categories')->group(function () {
    Route::get('/', [CategoryController::class, 'getCategories']);
});
