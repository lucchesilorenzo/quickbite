<?php

declare(strict_types=1);

namespace App\Http\Controllers\Public;

use App\Http\Controllers\Controller;
use App\Services\Public\CategoryService;
use Illuminate\Http\JsonResponse;
use Throwable;

class CategoryController extends Controller
{
    public function __construct(
        private readonly CategoryService $categoryService
    ) {}

    /**
     * Get all categories.
     */
    public function getCategories(): JsonResponse
    {
        try {
            $categories = $this->categoryService->getCategories();

            return response()->json([
                'success' => true,
                'message' => 'Categories retrieved successfully.',
                'categories' => $categories,
            ], 200);
        } catch (Throwable) {
            return response()->json([
                'success' => false,
                'message' => 'Could not get categories.',
            ], 500);
        }
    }
}
