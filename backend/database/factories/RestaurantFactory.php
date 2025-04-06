<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Restaurant>
 */
class RestaurantFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'name' => fake()->company(),
            'slug' => fn(array $attributes) => str($attributes['name'])->slug(),
            'description' => fake()->sentence(),
            'street_address' => fake()->streetAddress(),
            'postal_code' => fake()->postcode(),
            'city' => fake()->city(),
            'region' => fake()->state(),
            'country' => 'Italy',
            'phone_number' => fake()->e164PhoneNumber(),
            'email' => fake()->unique()->safeEmail(),
            'vat_id' => fake()->numerify('##########'),
            'min_amount' => fake()->randomFloat(2, 0, 50),
            'shipping_cost' => fake()->randomFloat(2, 0, 10),
            'image' => null,
            'discount' => null,
        ];
    }
}
