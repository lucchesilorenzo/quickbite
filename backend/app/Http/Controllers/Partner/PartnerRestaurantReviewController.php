<?php

declare(strict_types=1);

namespace App\Http\Controllers\Partner;

use App\Http\Controllers\Controller;
use App\Models\Restaurant;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Gate;

class PartnerRestaurantReviewController extends Controller
{
    /**
     * Get a partner's restaurant reviews.
     */
    public function getRestaurantReviews(Restaurant $restaurant): JsonResponse
    {
        // Check if user is authorized
        Gate::authorize('viewRestaurantReviews', $restaurant);

        try {
            $reviews = $restaurant->reviews()
                ->with(['customer', 'order'])
                ->orderBy('created_at', 'desc')
                ->get();

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
