<?php

namespace App\Http\Controllers;

use App\Http\Requests\Customer\CreateReviewRequest;
use App\Models\Restaurant;
use Illuminate\Http\JsonResponse;

class RestaurantController extends Controller
{
    /**
     * Get restaurants by display name.
     *
     * @param string $displayName
     * @return JsonResponse
     */
    public function getRestaurants(string $displayName): JsonResponse
    {
        try {
            $keywords = explode('-', $displayName);

            $restaurants = Restaurant::with([
                'categories',
                'deliveryDays',
                'reviews.customer',
                'menuCategories.menuItems',
            ])->where(function ($query) use ($keywords) {
                foreach ($keywords as $word) {
                    $query->orWhereLike('full_address', "%{$word}%");
                }
            })
                ->withAvg('reviews', 'rating')
                ->withCount('reviews')->get();

            return response()->json($restaurants);
        } catch (\Throwable $e) {
            return response()->json([
                'message' => 'Could not get restaurants.',
            ], 500);
        }
    }

    /**
     * Get a restaurant.
     *
     * @param string $restaurantSlug
     * @return JsonResponse
     */
    public function getRestaurant(string $restaurantSlug): JsonResponse
    {
        try {
            $restaurant = Restaurant::with([
                'categories',
                'deliveryDays',
                'reviews.customer',
                'menuCategories.menuItems',
            ])
                ->where('slug', $restaurantSlug)
                ->withAvg('reviews', 'rating')
                ->withCount('reviews')
                ->first();

            if (empty($restaurant)) {
                return response()->json([
                    'message' => 'Restaurant not found.',
                ], 404);
            }

            return response()->json($restaurant);
        } catch (\Throwable $e) {
            return response()->json([
                'message' => 'Could not get restaurant.',
            ], 500);
        }
    }

    /**
     * Create a review.
     *
     * @param string $restaurantSlug
     * @return JsonResponse
     */
    public function createReview(CreateReviewRequest $request, string $restaurantSlug): JsonResponse
    {
        // Get validated data
        $data = $request->validated();

        try {
            // Get user
            $user = auth()->user();

            // Get restaurant
            $restaurant = Restaurant::where('slug', $restaurantSlug)->first();

            if (empty($restaurant)) {
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
            $restaurant->reviews()->create([
                'user_id' => $user->id,
                'order_id' => $data['order_id'],
                'comment' => $data['comment'],
                'rating' => $data['rating'],
            ]);

            return response()->json([
                'message' => 'Review created successfully.',
                'restaurant' => $restaurant,
            ], 201);
        } catch (\Throwable $e) {
            return response()->json([
                'message' => 'Could not create review.',
            ], 500);
        }
    }
}
