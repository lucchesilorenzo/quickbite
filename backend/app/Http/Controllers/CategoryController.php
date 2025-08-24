<?php

declare(strict_types=1);

namespace App\Http\Controllers;

use App\Models\Category;
use Illuminate\Http\JsonResponse;
use Throwable;

class CategoryController extends Controller
{
    /**
     * Get all categories.
     */
    public function getCategories(): JsonResponse
    {
        try {
            $categories = Category::all();

            return response()->json($categories, 200);
        } catch (Throwable $e) {
            return response()->json([
                'message' => 'Could not get categories.',
            ], 500);
        }
    }
}
