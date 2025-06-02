<?php

namespace App\Http\Controllers;

use App\Models\Restaurant;
use App\Models\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Log;

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

            $restaurants = Restaurant::with(['categories', 'deliveryDays', 'reviews.customer'])
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
}
