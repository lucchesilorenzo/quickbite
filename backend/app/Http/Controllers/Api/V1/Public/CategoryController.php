<?php

declare(strict_types=1);

namespace App\Http\Controllers\Api\V1\Public;

use App\Http\Controllers\Controller;
use App\Http\Resources\Api\V1\Category\CategoryResource;
use App\Services\Public\CategoryService;
use Dedoc\Scramble\Attributes\Endpoint;
use Dedoc\Scramble\Attributes\Group;
use Dedoc\Scramble\Attributes\Response;
use Illuminate\Http\JsonResponse;
use Throwable;

#[Group('Public Categories')]
class CategoryController extends Controller
{
    public function __construct(
        private readonly CategoryService $categoryService
    ) {}

    /**
     * @unauthenticated
     */
    #[Endpoint(
        operationId: 'getCategories',
        title: 'Get categories',
        description: 'Get all restaurant categories.',
        method: 'GET'
    )]
    #[Response(status: 200, description: 'Categories retrieved successfully.')]
    #[Response(status: 500, description: 'Could not get categories.')]
    public function getCategories(): JsonResponse
    {
        try {
            $categories = $this->categoryService->getCategories();

            return CategoryResource::collection($categories)
                ->additional([
                    'success' => true,
                    'message' => 'Categories retrieved successfully.',
                ])
                ->response();
        } catch (Throwable) {
            return response()->json([
                'success' => false,
                'message' => 'Could not get categories.',
            ], 500);
        }
    }
}
