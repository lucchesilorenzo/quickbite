<?php

declare(strict_types=1);

namespace App\Http\Controllers;

use App\Models\Restaurant;
use App\Models\RestaurantReview;
use Illuminate\Http\JsonResponse;
use Throwable;

class RestaurantReviewController extends Controller
{
    public function __construct(private RestaurantReview $restaurantReview) {}

    /**
     * Get restaurant reviews.
     */
    public function getRestaurantReviews(Restaurant $restaurant): JsonResponse
    {
        try {
            $reviews = $this->restaurantReview->getReviews($restaurant);

            return response()->json($reviews, 200);
        } catch (Throwable $e) {
            return response()->json([
                'message' => 'Could not get reviews.',
            ], 500);
        }
    }
}
