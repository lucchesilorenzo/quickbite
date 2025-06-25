<?php

namespace App\Http\Controllers;

use App\Http\Requests\Customer\CreateReviewRequest;
use App\Models\Restaurant;
use Illuminate\Http\JsonResponse;

class RestaurantController extends Controller
{
    /**
     * Get all restaurants.
     *
     * @return JsonResponse
     */
    public function getRestaurants(): JsonResponse
    {
        try {
            $fullAddress = json_decode(request()->cookie('address'), true);

            if (empty($fullAddress['address']['postcode'])) {
                return response()->json([
                    'message' => 'Postcode is not valid.',
                ], 400);
            }

            $postcode = $fullAddress['address']['postcode'];

            $restaurants = Restaurant::with([
                'categories',
                'deliveryDays',
                'reviews.customer',
                'menuCategories.menuItems',
            ])
                ->where('postcode', $postcode)
                ->withAvg('reviews', 'rating')
                ->withCount('reviews')
                ->get();

            return response()->json($restaurants);
        } catch (\Throwable $e) {
            return response()->json([
                'message' => 'Could not get restaurants.',
                'error' => $e->getMessage(),
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
                'error' => $e->getMessage(),
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

            // Create review
            $restaurant->reviews()->create([
                'user_id' => $user->id,
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
                'error' => $e->getMessage(),
            ], 500);
        }
    }
}
