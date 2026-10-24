<?php

declare(strict_types=1);

namespace App\Http\Controllers\Api\V1\Private\Partner;

use App\Http\Controllers\Controller;
use App\Http\Resources\Api\V1\Review\ReviewResource;
use App\Models\Restaurant;
use App\Models\Review;
use App\Services\Private\Partner\ReviewService;
use Dedoc\Scramble\Attributes\Endpoint;
use Dedoc\Scramble\Attributes\Group;
use Dedoc\Scramble\Attributes\Response;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Gate;
use Throwable;

#[Group('Partner Reviews')]
class ReviewController extends Controller
{
    public function __construct(
        private readonly ReviewService $reviewService
    ) {}

    /**
     * Get all reviews.
     */
    #[Endpoint(
        operationId: 'getPartnerReviews',
        title: 'List reviews',
        description: 'List reviews for a restaurant.',
        method: 'GET'
    )]
    #[Response(
        status: 200,
        description: 'Reviews retrieved successfully.',
    )]
    #[Response(
        status: 500,
        description: 'An unexpected error occurred while retrieving reviews.',
    )]
    public function getReviews(Restaurant $restaurant): JsonResponse
    {
        Gate::authorize('viewAny', [Review::class, $restaurant]);

        try {
            $reviewsData = $this->reviewService->getReviews($restaurant);

            return ReviewResource::collection($reviewsData['reviews'])
                ->additional([
                    'success' => true,
                    'message' => 'Reviews retrieved successfully.',
                    'avg_rating' => $reviewsData['avg_rating'],
                    'count' => $reviewsData['count'],
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
