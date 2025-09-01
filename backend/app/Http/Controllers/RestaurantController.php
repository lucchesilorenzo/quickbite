<?php

declare(strict_types=1);

namespace App\Http\Controllers;

use App\Models\Restaurant;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;
use Throwable;

class RestaurantController extends Controller
{
    /**
     * Get restaurants.
     */
    public function getRestaurants(Request $request): JsonResponse
    {
        try {
            $lat = $request->query('lat');
            $lon = $request->query('lon');

            if (! $lat || ! $lon) {
                return response()->json([
                    'message' => 'Latitude and longitude are required.',
                ], 400);
            }

            $filters = $request->query('filter', []);
            $sortBy = $request->query('sort_by');
            $mov = $request->query('mov');
            $search = $request->query('q');

            $radius = 5; // km

            $haversine = '(6371 * acos(
                cos(radians(?)) *
                cos(radians(latitude)) *
                cos(radians(longitude) - radians(?)) +
                sin(radians(?)) *
                sin(radians(latitude))
                ))';

            $query = Restaurant::select('*')
                ->selectRaw("{$haversine} AS distance", [$lat, $lon, $lat])
                ->whereRaw("{$haversine} < ?", [$lat, $lon, $lat, $radius])
                ->where('is_approved', true)
                ->with([
                    'categories',
                    'deliveryDays' => function ($query) {
                        $query->orderBy('order');
                    },
                    'offers' => function ($query) {
                        $query->orderBy('discount_rate');
                    },
                    'reviews' => function ($query) {
                        $query->orderByDesc('created_at');
                    },
                    'reviews.customer',
                    'reviews.order',
                    'menuCategories' => function ($query) {
                        $query->orderBy('order')
                            ->with('menuItems', function ($query) {
                                $query->orderBy('order');
                            });
                    },
                ])
                ->withAvg('reviews', 'rating')
                ->withCount('reviews');

            // === Filters ===
            if (in_array('open_now', $filters)) {
                $dayName = mb_strtoupper(now()->format('l'));
                $currentTime = now()->format('H:i');

                $query->whereHas('deliveryDays', function ($q) use ($dayName, $currentTime) {
                    $q->where('day', $dayName)
                        ->whereNotNull('start_time')
                        ->whereNotNull('end_time')
                        ->where('start_time', '<=', $currentTime)
                        ->where('end_time', '>=', $currentTime);
                });
            }

            if (in_array('free_delivery', $filters)) {
                $query->where('delivery_fee', 0);
            }

            if (in_array('new', $filters)) {
                $query->where('created_at', '>=', now()->subDays(30));
            }

            if (in_array('with_discounts', $filters)) {
                $query->whereHas('offers');
            }

            // Ratings
            $ratingIntervals = [
                'one_star' => [1, 1.99],
                'two_stars' => [2, 2.99],
                'three_stars' => [3, 3.99],
                'four_stars' => [4, 4.99],
                'five_stars' => [5, 5],
            ];

            // Take first valid rating filter
            $selectedInterval = array_values(array_intersect(array_keys($ratingIntervals), $filters))[0] ?? null;

            if (! is_null($selectedInterval)) {
                // Take rating interval
                $range = $ratingIntervals[$selectedInterval];

                $query->whereHas('reviews', function ($q) use ($range) {
                    $q->select(DB::raw(1))
                        ->groupBy('restaurant_id')
                        ->havingRaw('AVG(rating) BETWEEN ? AND ?', $range);
                });
            }

            // MOV
            if ($mov) {
                $query->where('min_amount', '<=', $mov / 100);
            }

            // === Search ===
            if ($search) {
                $query->where(function ($q) use ($search) {
                    $q->whereLike('name', "%{$search}%")
                        ->orWhereHas('categories', fn($q) => $q->whereLike('name', "%{$search}%"))
                        ->orWhereHas('menuCategories.menuItems', fn($q) => $q->whereLike('name', "%{$search}%"));
                });
            }

            // === Sort ===
            $query->when($sortBy === 'review_rating', fn($q) => $q->orderByDesc('reviews_avg_rating')->orderBy('id'))
                ->when($sortBy === 'distance', fn($q) => $q->orderByRaw("{$haversine} ASC", [$lat, $lon, $lat])->orderBy('id'))
                ->when($sortBy === 'minimum_order_value', fn($q) => $q->orderBy('min_amount')->orderBy('id'))
                ->when($sortBy === 'delivery_time', fn($q) => $q->orderByRaw('(delivery_time_min + delivery_time_max) / 2')->orderBy('id'))
                ->when($sortBy === 'delivery_fee', fn($q) => $q->orderBy('delivery_fee')->orderBy('id'))
                ->when(! $sortBy, fn($q) => $q->orderBy('id'));

            $baseQuery = clone $query;
            $total = $baseQuery->count();

            $movCounts = [
                'all' => $total,
                '1000' => $baseQuery->where('min_amount', '<=', 10)->count(),
                '1500' => $baseQuery->where('min_amount', '<=', 15)->count(),
            ];
            $offerCounts = [
                'with_discounts' => $baseQuery->whereHas('offers')->count(),
            ];

            $restaurants = $query->cursorPaginate(2);

            return response()->json([
                'restaurants' => $restaurants,
                'meta' => [
                    'total' => $total,
                    'mov_counts' => $movCounts,
                    'offer_counts' => $offerCounts,
                ],
            ], 200);
        } catch (Throwable $e) {
            return response()->json([
                'message' => 'Could not get restaurants.',
                'error' => $e->getMessage(),
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
                    $query->orderBy('order');
                },
            ])
                ->where('slug', $restaurantSlug)
                ->where('is_approved', true)
                ->first();

            if (! $restaurant) {
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
}
