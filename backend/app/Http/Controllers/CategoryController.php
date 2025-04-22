<?php

namespace App\Http\Controllers;

use App\Models\Category;
use Illuminate\Http\JsonResponse;

class CategoryController extends Controller
{
    /**
     * Get all categories.
     *
     * @return JsonResponse
     */
    public function getCategories(): JsonResponse
    {
        try {
            $categories = Category::all();

            return response()->json($categories);
        } catch (\Throwable $e) {
            return response()->json([
                'message' => 'Could not get categories.',
                'error' => $e->getMessage(),
            ], 500);
        }
    }
}
