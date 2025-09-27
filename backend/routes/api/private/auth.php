<?php

declare(strict_types=1);

use App\Http\Controllers\Private\AuthController;
use App\Http\Controllers\Private\NotificationController;
use Illuminate\Support\Facades\Route;

Route::prefix('auth')
    ->middleware('auth:sanctum')
    ->group(function () {
        Route::get('/me', [AuthController::class, 'me']);
        Route::get('/notifications', [NotificationController::class, 'getNotifications']);
        Route::post('/notifications/mark-as-read', [NotificationController::class, 'markNotificationsAsRead']);
    });
