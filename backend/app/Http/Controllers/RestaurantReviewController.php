<?php

namespace App\Http\Controllers;

use App\Models\Restaurant;
use Illuminate\Http\JsonResponse;
use Throwable;

class RestaurantReviewController extends Controller
{
    /**
     * Get restaurant reviews.
     */
    public function getRestaurantReviews(Restaurant $restaurant): JsonResponse
    {
        try {
            $reviews = $restaurant->reviews()
                ->with(['customer', 'order'])
                ->orderBy('created_at', 'desc')
                ->paginate(5);

            $avg = $restaurant->reviews()->avg('rating');
            $count = $restaurant->reviews()->count();

            return response()->json([
                'reviews' => $reviews,
                'avg_rating' => ! is_null($avg) ? (float) $avg : null,
                'count' => $count,
            ], 200);
        } catch (Throwable $e) {
            return response()->json([
                'message' => 'Could not get reviews.',
            ], 500);
        }
    }
}
