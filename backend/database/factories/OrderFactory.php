<?php

namespace Database\Factories;

use App\Enums\RolesEnum;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Order>
 */
class OrderFactory extends Factory
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
            'order_code' => fake()->unique()->numberBetween(100000, 999999),
            'first_name' => fake()->firstName(),
            'last_name' => fake()->lastName(),
            'phone_number' => fake()->phoneNumber(),
            'street_address' => fake()->streetName(),
            'building_number' => fake()->buildingNumber(),
            'postcode' => fake()->postcode(),
            'city' => fake()->city(),
            'country' => 'Italy',
            'delivery_time' => fake()->time('H:i'),
            'notes' => fake()->optional()->text(100),
            'payment_method' => fake()->randomElement(['cash']),
        ];
    }
}
