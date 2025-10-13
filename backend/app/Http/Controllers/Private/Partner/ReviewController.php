<?php

declare(strict_types=1);

namespace App\Http\Controllers\Private\Partner;

use App\Http\Controllers\Controller;
use App\Models\Restaurant;
use App\Services\Private\Partner\PartnerReviewService;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Gate;
use Throwable;

class ReviewController extends Controller
{
    public function __construct(
        private readonly PartnerReviewService $partnerReviewService
    ) {}

    /**
     * Get partner's restaurant reviews.
     */
    public function getReviews(Restaurant $restaurant): JsonResponse
    {
        Gate::authorize('viewPartnerReviews', $restaurant);

        try {
            $reviews = $this->partnerReviewService->getReviews($restaurant);

            return response()->json($reviews, 200);
        } catch (Throwable) {
            return response()->json([
                'message' => 'Could not get reviews.',
            ], 500);
        }
    }
}
