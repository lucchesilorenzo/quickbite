<?php

declare(strict_types=1);

namespace Database\Factories;

use App\Enums\UserRole;
use App\Models\Order;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Review>
 */
class ReviewFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'user_id' => User::role(UserRole::CUSTOMER)
                ->inRandomOrder()
                ->first()
                ->id,
            'order_id' => Order::query()
                ->inRandomOrder()
                ->first()
                ->id,
            'comment' => fake()->sentence(),
            'rating' => fake()->numberBetween(1, 5),
        ];
    }
}
