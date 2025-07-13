<?php

declare(strict_types=1);

use App\Http\Controllers\CategoryController;
use Illuminate\Support\Facades\Route;

Route::prefix('categories')->group(function () {
    Route::get('/', [CategoryController::class, 'getCategories']);
});
