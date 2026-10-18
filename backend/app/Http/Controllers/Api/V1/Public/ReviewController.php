<?php

declare(strict_types=1);

namespace App\Http\Controllers\Api\V1\Public;

use App\Http\Controllers\Controller;
use App\Http\Resources\Api\V1\Review\ReviewResource;
use App\Models\Restaurant;
use App\Services\Public\ReviewService;
use Dedoc\Scramble\Attributes\Endpoint;
use Dedoc\Scramble\Attributes\Group;
use Dedoc\Scramble\Attributes\QueryParameter;
use Dedoc\Scramble\Attributes\Response;
use Illuminate\Http\JsonResponse;
use Throwable;

#[Group('Public Reviews')]
class ReviewController extends Controller
{
    public function __construct(
        private readonly ReviewService $reviewService
    ) {}

    /**
     * @unauthenticated
     */
    #[Endpoint(
        operationId: 'getReviews',
        title: 'Get reviews of a restaurant',
        description: 'Get reviews of a restaurant.',
        method: 'GET'
    )]
    #[QueryParameter(
        name: 'page',
        description: 'Page number.',
        required: false,
        type: 'integer',
        example: '1'
    )]
    #[Response(status: 200, description: 'Reviews retrieved successfully.')]
    #[Response(status: 404, description: 'Restaurant not found.')]
    #[Response(status: 500, description: 'Could not get reviews.')]
    public function getReviews(Restaurant $restaurant): JsonResponse
    {
        try {
            $data = $this->reviewService->getReviews($restaurant);

            return ReviewResource::collection($data['reviews'])
                ->additional([
                    'avg_rating' => $data['avg_rating'],
                    'count' => $data['count'],
                    'success' => true,
                    'message' => 'Reviews retrieved successfully.',
                ])
                ->response();
        } catch (Throwable) {
            return response()->json([
                'success' => false,
                'message' => 'Could not get reviews.',
            ], 500);
        }
    }
}
