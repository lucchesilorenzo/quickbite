<?php

use App\Http\Controllers\RestaurantController;
use Illuminate\Support\Facades\Route;

Route::prefix('restaurants')->group(function () {
  Route::get('/', [RestaurantController::class, 'getRestaurants']);
  Route::get('/{restaurantSlug}', [RestaurantController::class, 'getRestaurant']);
  Route::post('/{restaurantSlug}/reviews', [RestaurantController::class, 'createReview'])->middleware(['auth:sanctum', 'role:customer']);
});
