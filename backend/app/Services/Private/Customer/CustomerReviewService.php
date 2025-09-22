<?php

declare(strict_types=1);

namespace App\Services\Private\Customer;

use App\Exceptions\Private\Customer\CustomerAlreadyReviewedException;
use App\Models\Restaurant;
use App\Models\RestaurantReview;
use App\Models\User;
use App\Notifications\NewReviewReceived;
use Illuminate\Support\Facades\Notification;

class CustomerReviewService
{
    public function createReview(
        User $customer,
        array $data,
        string $restaurantSlug
    ): RestaurantReview {
        $restaurant = Restaurant::where('slug', $restaurantSlug)
            ->firstOrFail();

        // Check if customer has already reviewed this order
        $alreadyReviewed = $restaurant->reviews()
            ->where('order_id', $data['order_id'])
            ->where('user_id', $customer->id)
            ->exists();

        if ($alreadyReviewed) {
            throw new CustomerAlreadyReviewedException;
        }

        /** @var RestaurantReview $review */
        $review = $restaurant->reviews()->create([
            'user_id' => $customer->id,
            'order_id' => $data['order_id'],
            'comment' => $data['comment'],
            'rating' => $data['rating'],
        ]);

        Notification::send($restaurant->partners, new NewReviewReceived($review));

        return $review;
    }
}
