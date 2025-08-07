<?php

declare(strict_types=1);

namespace App\Http\Controllers\Partner;

use App\Http\Controllers\Controller;
use App\Http\Requests\Partner\CreateRestaurantOfferRequest;
use App\Http\Requests\Partner\UpdateRestaurantDeliveryTimesRequest;
use App\Http\Requests\Partner\UpdateRestaurantFeesRequest;
use App\Http\Requests\Partner\UpdateRestaurantStatusRequest;
use App\Models\Restaurant;
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
                'deliveryDays' => function ($query) {
                    $query->orderBy('order', 'asc');
                },
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

    /**
     * Get a partner's restaurant.
     */
    public function getRestaurant(Restaurant $restaurant): JsonResponse
    {
        try {
            $user = auth()->user();

            $restaurant = $user->restaurants()
                ->where('id', $restaurant->id)
                ->with([
                    'categories',
                    'deliveryDays' => function ($query) {
                        $query->orderBy('order', 'asc');
                    },
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
                ->first();

            if (! $restaurant) {
                return response()->json([
                    'message' => 'No restaurant found.',
                ], 404);
            }

            return response()->json($restaurant, 200);
        } catch (Throwable $e) {
            return response()->json([
                'message' => 'Could not get restaurant.',
            ], 500);
        }
    }

    /**
     * Create a partner's restaurant offer.
     */
    public function createRestaurantOffer(
        Restaurant $restaurant,
        CreateRestaurantOfferRequest $request,
    ) {
        // Get validated data
        $data = $request->validated();

        try {
            $user = auth()->user();

            $restaurant = $user->restaurants()
                ->where('id', $restaurant->id)
                ->first();

            if (! $restaurant) {
                return response()->json([
                    'message' => 'No restaurant found.',
                ], 404);
            }

            // Check if offer already exists
            $doesOfferExist = $restaurant->offers()
                ->where('discount_rate', $data['discount_rate'])
                ->exists();

            if ($doesOfferExist) {
                return response()->json([
                    'message' => 'An offer with the same discount rate already exists.',
                ], 422);
            }

            // Create offer
            $offer = $restaurant->offers()->create($data);

            return response()->json([
                'message' => 'Offer created successfully.',
                'offer' => $offer,
            ], 201);
        } catch (Throwable $e) {
            return response()->json([
                'message' => 'Could not create offer.',
            ], 500);
        }
    }

    /**
     * Update a partner's restaurant status.
     */
    public function updateRestaurantStatus(
        Restaurant $restaurant,
        UpdateRestaurantStatusRequest $request
    ): JsonResponse {
        // Get validated data
        $data = $request->validated();

        try {
            $user = auth()->user();

            $restaurant = $user->restaurants()
                ->where('id', $restaurant->id)
                ->first();

            if (! $restaurant) {
                return response()->json([
                    'message' => 'No restaurant found.',
                ], 404);
            }

            $restaurant->update([
                'force_close' => $data['force_close'],
            ]);

            return response()->json([
                'message' => 'Restaurant status updated successfully.',
                'restaurant' => $restaurant,
            ], 200);
        } catch (Throwable $e) {
            return response()->json([
                'message' => 'Could not update restaurant status.',
            ], 500);
        }
    }

    /**
     * Update a partner's restaurant fees.
     */
    public function updateRestaurantFees(
        Restaurant $restaurant,
        UpdateRestaurantFeesRequest $request
    ): JsonResponse {
        // Get validated data
        $data = $request->validated();

        try {
            $user = auth()->user();

            $restaurant = $user->restaurants()
                ->where('id', $restaurant->id)
                ->first();

            if (! $restaurant) {
                return response()->json([
                    'message' => 'No restaurant found.',
                ], 404);
            }

            $restaurant->update($data);

            return response()->json([
                'message' => 'Restaurant fees updated successfully.',
                'restaurant' => $restaurant,
            ], 200);
        } catch (Throwable $e) {
            return response()->json([
                'message' => 'Could not update restaurant fees.',
            ], 500);
        }
    }

    /**
     * Update a partner's restaurant delivery times.
     */
    public function updateRestaurantDeliveryTimes(
        Restaurant $restaurant,
        UpdateRestaurantDeliveryTimesRequest $request
    ): JsonResponse {
        // Get validated data
        $data = $request->validated();

        try {
            $user = auth()->user();

            $restaurant = $user->restaurants()
                ->where('id', $restaurant->id)
                ->first();

            if (! $restaurant) {
                return response()->json([
                    'message' => 'No restaurant found.',
                ], 404);
            }

            // Update delivery days
            foreach ($data['delivery_days'] as $deliveryDay) {
                $restaurant->deliveryDays()
                    ->where('day', $deliveryDay['day'])
                    ->update([
                        'start_time' => $deliveryDay['start_time'],
                        'end_time' => $deliveryDay['end_time'],
                    ]);
            }

            return response()->json([
                'message' => 'Restaurant delivery times updated successfully.',
                'restaurant' => $restaurant,
            ], 200);
        } catch (Throwable $e) {
            return response()->json([
                'message' => 'Could not update restaurant delivery times.',
            ], 500);
        }
    }
}
