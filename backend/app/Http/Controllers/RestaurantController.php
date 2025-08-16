<?php

declare(strict_types=1);

namespace App\Http\Controllers;

use App\Http\Requests\Review\Customer\CustomerCreateReviewRequest;
use App\Models\Restaurant;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Storage;
use Throwable;

class RestaurantController extends Controller
{
    /**
     * Get restaurants by display name.
     */
    public function getRestaurants(): JsonResponse
    {
        try {
            // Get latitude and longitude
            $lat = request()->query('lat');
            $lon = request()->query('lon');

            if (! $lat || ! $lon) {
                return response()->json([
                    'message' => 'Latitude and longitude are required.',
                ], 400);
            }

            $radius = 5; // km

            // Haversine formula
            $haversine = '(6371 * acos(
                cos(radians(?)) *
                cos(radians(latitude)) *
                cos(radians(longitude) - radians(?)) +
                sin(radians(?)) *
                sin(radians(latitude))
            ))';

            $restaurants = Restaurant::select('*')
                ->selectRaw("{$haversine} AS distance", [$lat, $lon, $lat])
                ->whereRaw("{$haversine} < ?", [$lat, $lon, $lat, $radius])
                ->orderByRaw("{$haversine} ASC", [$lat, $lon, $lat])
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
                    'reviews.order',
                    'menuCategories' => function ($query) {
                        $query->orderBy('order', 'asc')
                            ->with('menuItems', function ($query) {
                                $query->orderBy('order', 'asc');
                            });
                    },
                ])
                ->where('is_approved', true)
                ->withAvg('reviews', 'rating')
                ->withCount('reviews')
                ->get();

            return response()->json($restaurants, 200);
        } catch (Throwable $e) {
            return response()->json([
                'message' => 'Could not get restaurants.',
            ], 500);
        }
    }

    /**
     * Get a restaurant.
     */
    public function getRestaurant(string $restaurantSlug): JsonResponse
    {
        try {
            // Get restaurant
            $restaurant = Restaurant::with([
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
                'reviews.order',
                'menuCategories' => function ($query) {
                    $query->orderBy('order', 'asc')
                        ->with('menuItems', function ($query) {
                            $query->orderBy('order', 'asc');
                        });
                },
            ])
                ->where('slug', $restaurantSlug)
                ->where('is_approved', true)
                ->withAvg('reviews', 'rating')
                ->withCount('reviews')
                ->first();

            if (empty($restaurant)) {
                return response()->json([
                    'message' => 'Restaurant not found.',
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
     * Get a restaurant logo as base64.
     */
    public function getBase64Logo(Restaurant $restaurant): JsonResponse
    {
        try {
            // Remove '/storage/' prefix from path
            $relativePath = str_replace('/storage/', '', $restaurant->logo);

            if (! $relativePath || ! Storage::disk('public')->exists($relativePath)) {
                return response()->json(['message' => 'Logo not found.'], 404);
            }

            $logo = Storage::disk('public')->get($relativePath);
            $mimeType = Storage::disk('public')->mimeType($relativePath);

            $base64Logo = 'data:' . $mimeType . ';base64,' . base64_encode($logo);

            return response()->json(['logo' => $base64Logo], 200);
        } catch (Throwable $e) {
            return response()->json([
                'message' => 'Could not get logo.',
            ], 500);
        }
    }

    /**
     * Create a review.
     */
    public function createReview(
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
        } catch (Throwable $e) {
            return response()->json([
                'message' => 'Could not create review.',
            ], 500);
        }
    }
}
