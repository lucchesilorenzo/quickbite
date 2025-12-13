<?php

declare(strict_types=1);

namespace App\Http\Controllers\Private\Partner;

use App\Http\Controllers\Controller;
use App\Models\Restaurant;
use App\Models\Review;
use App\Services\Private\Partner\ReviewService;
use Dedoc\Scramble\Attributes\Group;
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
    public function getReviews(Restaurant $restaurant): JsonResponse
    {
        Gate::authorize('viewAny', [Review::class, $restaurant]);

        try {
            $reviewsData = $this->reviewService->getReviews($restaurant);

            return response()->json([
                'success' => true,
                'message' => 'Reviews retrieved successfully.',
                'reviews' => $reviewsData['reviews'],
                'avg_rating' => $reviewsData['avg_rating'],
                'count' => $reviewsData['count'],
            ], 200);
        } catch (Throwable) {
            return response()->json([
                'success' => false,
                'message' => 'Could not get reviews.',
            ], 500);
        }
    }
}
