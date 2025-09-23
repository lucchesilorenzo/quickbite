<?php

declare(strict_types=1);

namespace App\Services\Public;

use App\Models\Restaurant;

class ReviewService
{
    private const int PER_PAGE = 5;

    public function getReviews(Restaurant $restaurant): array
    {
        $reviews = $restaurant->reviews()
            ->with(['customer', 'order'])
            ->orderByDesc('created_at')
            ->paginate(self::PER_PAGE);

        $avg = $restaurant->reviews()->avg('rating');

        return [
            'reviews' => $reviews,
            'avg_rating' => $avg !== null ? (float) $avg : null,
            'count' => $restaurant->reviews()->count(),
        ];
    }
}
