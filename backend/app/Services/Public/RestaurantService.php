<?php

declare(strict_types=1);

namespace App\Services\Public;

use App\Exceptions\Public\RestaurantLogoNotFoundException;
use App\Models\Category;
use App\Models\Restaurant;
use Carbon\Carbon;
use DB;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Support\Facades\Storage;

class RestaurantService
{
    private const int RADIUS_KM = 5;

    private const array RATING_INTERVALS = [
        'one_star' => [1, 1.99],
        'two_stars' => [2, 2.99],
        'three_stars' => [3, 3.99],
        'four_stars' => [4, 4.99],
        'five_stars' => [5, 5],
    ];

    private const string HAVERSINE = '(6371 * acos(
		cos(radians(?)) *
		cos(radians(latitude)) *
		cos(radians(longitude) - radians(?)) +
		sin(radians(?)) *
		sin(radians(latitude))
    ))';

    private const array MOV_THRESHOLDS = [
        '1000' => 10,
        '1500' => 15,
    ];

    private const int PER_PAGE = 10;

    public function getRestaurants(array $data): array
    {
        $lat = $data['lat'];
        $lon = $data['lon'];
        $filters = $data['filter'] ?? [];
        $sortBy = $data['sort_by'] ?? null;
        $mov = $data['mov'] ?? null;
        $search = $data['q'] ?? null;

        $query = Restaurant::select('*')
            ->selectRaw(self::HAVERSINE . ' AS distance', [$lat, $lon, $lat])
            ->whereRaw(self::HAVERSINE . ' < ?', [$lat, $lon, $lat, self::RADIUS_KM])
            ->where('is_approved', true)
            ->with([
                'categories',
                'deliveryDays' => function ($query): void {
                    $query->orderBy('order');
                },
                'offers' => function ($query): void {
                    $query->orderBy('discount_rate');
                },
                'reviews' => function ($query): void {
                    $query->orderByDesc('created_at');
                },
                'reviews.customer',
                'reviews.order',
                'menuCategories' => function ($query): void {
                    $query->orderBy('order')
                        ->with('menuItems', function ($query): void {
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

    public function getRestaurant(string $restaurantSlug): Restaurant
    {
        return Restaurant::with([
            'categories',
            'deliveryDays' => function ($query): void {
                $query->orderBy('order');
            },
        ])
            ->where('slug', $restaurantSlug)
            ->where('is_approved', true)
            ->firstOrFail();
    }

    public function getDeliverySlots(Restaurant $restaurant): array
    {
        $currentDeliveryDay = $restaurant->deliveryDays()
            ->where('day', mb_strtoupper(now()->format('l')))
            ->firstOrFail();

        $interval = 5;
        $startTime = $this->roundUpToNextInterval(now());
        $endTime = Carbon::parse($currentDeliveryDay->end_time);

        $deliverySlots = [];

        while ($startTime->lessThanOrEqualTo($endTime)) {
            $deliverySlots[] = $startTime->toIso8601String();

            $startTime->addMinutes($interval)->second(0);
        }

        $startTimeDay = today()->setTimeFromTimeString($currentDeliveryDay->start_time);
        $endTimeDay = today()->setTimeFromTimeString($currentDeliveryDay->end_time);

        $isAsapAvailable = $restaurant->is_open && now()->between($startTimeDay, $endTimeDay);

        return [
            'is_asap_available' => $isAsapAvailable,
            'delivery_slots' => $deliverySlots,
        ];
    }

    public function getBase64Logo(Restaurant $restaurant): array
    {
        if (! $restaurant->logo) {
            throw new RestaurantLogoNotFoundException;
        }

        $relativePath = str_replace('/storage/', '', $restaurant->logo);

        if (! Storage::disk('public')->exists($relativePath)) {
            throw new RestaurantLogoNotFoundException;
        }

        $logo = Storage::disk('public')->get($relativePath);
        $mimeType = Storage::disk('public')->mimeType($relativePath);

        return [
            'logo' => 'data:' . $mimeType . ';base64,' . base64_encode((string) $logo),
        ];
    }

    private function applyFilters(Builder $query, array $filters, ?string $search): void
    {
        if (in_array('open_now', $filters)) {
            $dayName = mb_strtoupper(now()->format('l'));
            $currentTime = now()->format('H:i');

            $query->whereHas('deliveryDays', function ($q) use ($dayName, $currentTime): void {
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
        $selectedRatingInterval = array_values(array_intersect(array_keys(self::RATING_INTERVALS), $filters))[0] ?? null;

        if ($selectedRatingInterval !== null) {
            // Take rating interval
            $range = self::RATING_INTERVALS[$selectedRatingInterval];

            $query->whereHas('reviews', function ($q) use ($range): void {
                $q->select(DB::raw(1))
                    ->groupBy('restaurant_id')
                    ->havingRaw('AVG(rating) BETWEEN ? AND ?', $range);
            });
        }

        // Categories filter
        $categories = Category::pluck('slug')->toArray();
        $selectedCategories = array_values(array_intersect($categories, $filters));

        if (count($selectedCategories) > 0) {
            $query->whereHas('categories', function ($q) use ($selectedCategories): void {
                $q->whereIn('slug', $selectedCategories);
            });
        }

        // === Search ===
        if ($search !== null && $search !== '' && $search !== '0') {
            $query->where(function ($q) use ($search): void {
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
            ->when($sortBy === null || $sortBy === '' || $sortBy === '0', fn ($q) => $q->orderBy('id'));
    }

    private function buildMeta(Builder $baseQuery, int $total): array
    {
        $movCounts = [
            'all' => $baseQuery->count(),
        ];

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

    private function roundUpToNextInterval(Carbon $currentTime, int $intervalMinutes = 5): Carbon
    {
        $minutes = $currentTime->minute;
        $remainder = $minutes % $intervalMinutes;

        if ($remainder > 0) {
            return $currentTime->addMinutes($intervalMinutes - $remainder)->second(0);
        }

        return $currentTime;
    }
}
