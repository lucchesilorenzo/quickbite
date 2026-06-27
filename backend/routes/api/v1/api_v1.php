<?php

declare(strict_types=1);

use Illuminate\Support\Facades\Route;

Route::prefix('v1')->group(function () {
    // === Public routes ===
    require __DIR__ . '/public.php';

    // === Private routes ===
    require __DIR__ . '/private/auth.php';
    require __DIR__ . '/private/customers.php';
    require __DIR__ . '/private/partners.php';
    require __DIR__ . '/private/riders.php';
});
