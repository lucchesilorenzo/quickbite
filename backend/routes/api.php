<?php

use Illuminate\Support\Facades\Route;

require __DIR__ . '/api/categories.php';

Route::middleware('auth:sanctum')->group(function () {});
