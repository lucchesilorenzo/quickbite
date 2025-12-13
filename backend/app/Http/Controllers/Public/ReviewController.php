<?php

declare(strict_types=1);

namespace App\Http\Controllers\Public;

use App\Http\Controllers\Controller;
use App\Models\Restaurant;
use App\Services\Public\ReviewService;
use Dedoc\Scramble\Attributes\Group;
use Illuminate\Http\JsonResponse;
use Throwable;

#[Group('Public Reviews')]
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
