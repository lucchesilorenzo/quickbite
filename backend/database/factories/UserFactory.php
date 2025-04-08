<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\User>
 */
class UserFactory extends Factory
{
    /**
     * The current password being used by the factory.
     */
    protected static ?string $password;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'first_name' => fake()->firstName(),
            'last_name' => fake()->lastName(),
            'email' => fake()->unique()->safeEmail(),
            'email_verified_at' => now(),
            'password' => static::$password ??= Hash::make('test'),
            'role' => fake()->randomElement(['CUSTOMER', 'RESTAURATEUR', 'RIDER']),
            'profile_picture' => null,
            'date_of_birth' => fake()->date(),
            'phone_number' => fake()->e164PhoneNumber(),
            'street_address' => fake()->streetAddress(),
            'building_number' => fake()->buildingNumber(),
            'postal_code' => fake()->postcode(),
            'city' => fake()->city(),
            'country' => 'Italy',
            'driving_licence' => fn(array $attributes) => $attributes['role'] === 'RIDER' ? fake()->numerify('##########') : null,
            'is_approved' => fake()->boolean(),
            'remember_token' => Str::random(10),
        ];
    }

    /**
     * Indicate that the model's email address should be unverified.
     */
    public function unverified(): static
    {
        return $this->state(fn(array $attributes) => [
            'email_verified_at' => null,
        ]);
    }
}
