<?php

declare(strict_types=1);

use App\Http\Controllers\Private\Rider\AuthController;
use App\Http\Controllers\Private\Rider\DeliveryController;
use App\Http\Controllers\Private\Rider\JobApplicationController;
use App\Http\Controllers\Private\Rider\JobPostController;
use App\Http\Controllers\Private\Rider\NotificationController;
use App\Http\Controllers\Private\Rider\ProfileController;
use App\Http\Controllers\Private\Rider\RestaurantController;
use Illuminate\Support\Facades\Route;

Route::prefix('rider')->group(function (): void {
    // === AUTH ===
    Route::prefix('auth')->group(function (): void {
        Route::post('/register', [AuthController::class, 'register']);
        Route::post('/login', [AuthController::class, 'login']);
        Route::post('/logout', [AuthController::class, 'logout'])->middleware('auth:sanctum', 'role:rider');
    });

    // === NOTIFICATIONS ===
    Route::prefix('notifications')
        ->middleware(['auth:sanctum', 'role:rider'])
        ->group(function (): void {
            Route::get('/', [NotificationController::class, 'getNotifications']);
            Route::post('/mark-as-read', [NotificationController::class, 'markNotificationsAsRead']);
        });

    // === PROFILE MANAGEMENT ===
    Route::prefix('profile')
        ->middleware(['auth:sanctum', 'role:rider'])
        ->group(function (): void {
            Route::patch('/general', [ProfileController::class, 'updateProfileGeneralInformation']);
            Route::patch('/notifications', [ProfileController::class, 'updateProfileNotifications']);
        });

    // === RESTAURANT ===
    Route::prefix('restaurant')
        ->middleware(['auth:sanctum', 'role:rider'])
        ->group(function (): void {
            Route::get('/', [RestaurantController::class, 'getRestaurant']);

            Route::prefix('deliveries')->group(function (): void {
                Route::get('/', [DeliveryController::class, 'getDeliveries']);
            });
        });

    // === JOB POSTS ===
    Route::prefix('job-posts')
        ->middleware(['auth:sanctum', 'role:rider'])
        ->group(function (): void {
            Route::get('/', [JobPostController::class, 'getJobPosts']);
            Route::get('/{jobPost}', [JobPostController::class, 'getJobPost']);
            Route::post('/{jobPost}/applications', [JobApplicationController::class, 'createJobApplication']);
        });
});
