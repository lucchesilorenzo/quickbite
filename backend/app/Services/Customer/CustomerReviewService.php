<?php

declare(strict_types=1);

namespace App\Services\Customer;

use App\Models\Restaurant;
use App\Models\RestaurantReview;
use App\Models\User;
use Exception;

class CustomerReviewService
{
    public function createReview(
        User $user,
        string $restaurantSlug,
        array $data
    ): RestaurantReview {
        // Get restaurant
        $restaurant = Restaurant::where('slug', $restaurantSlug)->first();

        if (! $restaurant) {
            throw new Exception('Restaurant not found.', 404);
        }

        // Check if user has already reviewed this order
        $alreadyReviewed = $restaurant->reviews()
            ->where('order_id', $data['order_id'])
            ->where('user_id', $user->id)
            ->exists();

        if ($alreadyReviewed) {
            throw new Exception('You have already reviewed this order.', 409);
        }

        /** @var RestaurantReview $review */
        $review = $restaurant->reviews()->create([
            'user_id' => $user->id,
            'order_id' => $data['order_id'],
            'comment' => $data['comment'],
            'rating' => $data['rating'],
        ]);

        return $review;
    }
}
