<?php

namespace Database\Factories;

use App\Enums\RolesEnum;
use App\Models\Order;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\RestaurantReview>
 */
class RestaurantReviewFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'user_id' => User::role(RolesEnum::CUSTOMER)->inRandomOrder()->first()->id,
            'order_id' => Order::inRandomOrder()->first()->id,
            'comment' => fake()->sentence(),
            'rating' => fake()->numberBetween(1, 5),
        ];
    }
}
