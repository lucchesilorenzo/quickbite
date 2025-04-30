<?php

namespace App\Http\Controllers;

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

            $restaurants = Restaurant::with(['categories', 'deliveryDays', 'reviews'])
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
}
