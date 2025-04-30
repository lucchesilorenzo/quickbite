<?php

use Illuminate\Support\Facades\Route;

require __DIR__ . '/api/categories.php';
require __DIR__ . '/api/restaurants.php';

Route::middleware('auth:sanctum')->group(function () {});
