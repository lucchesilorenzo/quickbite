<?php

namespace App\Http\Controllers\Customer;

use App\Http\Controllers\Controller;
use App\Http\Requests\Customer\Review\CustomerCreateReviewRequest;
use App\Models\Restaurant;
use Illuminate\Http\JsonResponse;
use Throwable;

class CustomerRestaurantReviewController extends Controller
{
    /**
     * Create a customer review.
     */
    public function createCustomerReview(
        CustomerCreateReviewRequest $request,
        string $restaurantSlug
    ): JsonResponse {
        // Get validated data
        $data = $request->validated();

        try {
            // Get user
            $user = auth()->user();

            // Get restaurant
            $restaurant = Restaurant::where('slug', $restaurantSlug)->first();

            if (! $restaurant) {
                return response()->json([
                    'message' => 'Restaurant not found.',
                ], 404);
            }

            // Check if user has already reviewed this order
            $alreadyReviewed = $restaurant->reviews()
                ->where('order_id', $data['order_id'])
                ->where('user_id', $user->id)
                ->exists();

            if ($alreadyReviewed) {
                return response()->json([
                    'message' => 'You have already reviewed this order.',
                ], 409);
            }

            // Create review
            $review = $restaurant->reviews()->create([
                'user_id' => $user->id,
                'order_id' => $data['order_id'],
                'comment' => $data['comment'],
                'rating' => $data['rating'],
            ]);

            return response()->json([
                'message' => 'Review created successfully.',
                'review' => $review,
            ], 201);
        } catch (Throwable $e) {
            return response()->json([
                'message' => 'Could not create review.',
            ], 500);
        }
    }
}
