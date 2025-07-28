<?php

declare(strict_types=1);

namespace App\Http\Controllers\Partner;

use App\Http\Controllers\Controller;
use Illuminate\Http\JsonResponse;
use Throwable;

class PartnerRestaurantController extends Controller
{
    /**
     * Get partner's restaurants.
     */
    public function getRestaurants(): JsonResponse
    {
        try {
            $user = auth()->user();

            $restaurants = $user->restaurants()->with([
                'categories',
                'deliveryDays',
                'offers' => function ($query) {
                    $query->orderBy('discount_rate', 'asc');
                },
                'reviews' => function ($query) {
                    $query->orderBy('created_at', 'desc');
                },
                'reviews.customer',
                'menuCategories.menuItems',
            ])
                ->withAvg('reviews', 'rating')
                ->withCount('reviews')
                ->get();

            if ($restaurants->isEmpty()) {
                return response()->json([
                    'message' => 'No restaurants found.',
                ], 404);
            }

            return response()->json($restaurants, 200);
        } catch (Throwable $e) {
            return response()->json([
                'message' => 'Could not get restaurants.',
            ], 500);
        }
    }
}
