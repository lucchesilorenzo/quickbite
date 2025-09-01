<?php

declare(strict_types=1);

namespace App\Services;

use App\Models\Restaurant;
use DB;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Http\Request;
use InvalidArgumentException;

class RestaurantService
{
    private const RADIUS_KM = 5;

    private const RATING_INTERVALS = [
        'one_star' => [1, 1.99],
        'two_stars' => [2, 2.99],
        'three_stars' => [3, 3.99],
        'four_stars' => [4, 4.99],
        'five_stars' => [5, 5],
    ];

    private const HAVERSINE = '(6371 * acos(
		cos(radians(?)) *
		cos(radians(latitude)) *
		cos(radians(longitude) - radians(?)) +
		sin(radians(?)) *
		sin(radians(latitude))
    ))';

    private const MOV_THRESHOLDS = [
        '1000' => 10,
        '1500' => 15,
    ];

    private const PER_PAGE = 10;

    public function getRestaurants(Request $request): array
    {
        $lat = $request->query('lat');
        $lon = $request->query('lon');

        if (! $lat || ! $lon) {
            throw new InvalidArgumentException('Latitude and longitude are required.');
        }

        $filters = $request->query('filter', []);
        $sortBy = $request->query('sort_by');
        $mov = $request->query('mov');
        $search = $request->query('q');

        $query = Restaurant::select('*')
            ->selectRaw(self::HAVERSINE . ' AS distance', [$lat, $lon, $lat])
            ->whereRaw(self::HAVERSINE . ' < ?', [$lat, $lon, $lat, self::RADIUS_KM])
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
        $this->applyFilters($query, $filters, $search);

        // Clone query
        $baseQuery = clone $query;

        // MOV
        if ($mov) {
            $query->where('min_amount', '<=', $mov / 100);
        }

        // === Sort ===
        $this->applySort($query, $sortBy, self::HAVERSINE, $lat, $lon);

        $total = $query->count();
        $restaurants = $query->cursorPaginate(self::PER_PAGE);
        $meta = $this->buildMeta($baseQuery, $total);

        return [
            'restaurants' => $restaurants,
            'meta' => $meta,
        ];
    }

    private function applyFilters(Builder $query, array $filters, ?string $search): void
    {
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

        // Take first valid rating filter
        $selectedInterval = array_values(array_intersect(array_keys(self::RATING_INTERVALS), $filters))[0] ?? null;

        if (! is_null($selectedInterval)) {
            // Take rating interval
            $range = self::RATING_INTERVALS[$selectedInterval];

            $query->whereHas('reviews', function ($q) use ($range) {
                $q->select(DB::raw(1))
                    ->groupBy('restaurant_id')
                    ->havingRaw('AVG(rating) BETWEEN ? AND ?', $range);
            });
        }

        // === Search ===
        if ($search) {
            $query->where(function ($q) use ($search) {
                $q->whereLike('name', "%{$search}%")
                    ->orWhereHas('categories', fn ($q) => $q->whereLike('name', "%{$search}%"))
                    ->orWhereHas('menuCategories.menuItems', fn ($q) => $q->whereLike('name', "%{$search}%"));
            });
        }
    }

    private function applySort(Builder $query, ?string $sortBy, string $haversine, string $lat, string $lon): void
    {
        $query->when($sortBy === 'review_rating', fn ($q) => $q->orderByDesc('reviews_avg_rating')->orderBy('id'))
            ->when($sortBy === 'distance', fn ($q) => $q->orderByRaw("{$haversine} ASC", [$lat, $lon, $lat])->orderBy('id'))
            ->when($sortBy === 'minimum_order_value', fn ($q) => $q->orderBy('min_amount')->orderBy('id'))
            ->when($sortBy === 'delivery_time', fn ($q) => $q->orderByRaw('(delivery_time_min + delivery_time_max) / 2')->orderBy('id'))
            ->when($sortBy === 'delivery_fee', fn ($q) => $q->orderBy('delivery_fee')->orderBy('id'))
            ->when(! $sortBy, fn ($q) => $q->orderBy('id'));
    }

    private function buildMeta(Builder $baseQuery, int $total): array
    {
        $movCounts = ['all' => $baseQuery->count()];

        foreach (self::MOV_THRESHOLDS as $key => $value) {
            $movCounts[$key] = (clone $baseQuery)->where('min_amount', '<=', $value)->count();
        }

        $offerCounts = [
            'with_discounts' => (clone $baseQuery)->whereHas('offers')->count(),
        ];

        return [
            'total' => $total,
            'mov_counts' => $movCounts,
            'offer_counts' => $offerCounts,
        ];
    }
}
