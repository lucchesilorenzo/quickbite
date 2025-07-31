<?php

declare(strict_types=1);

namespace Database\Factories;

use App\Enums\UserRole;
use App\Models\User;
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
            'profile_picture' => null,
            'date_of_birth' => fake()->date(),
            'phone_number' => fake()->e164PhoneNumber(),
            'street_address' => fake()->streetAddress(),
            'building_number' => fake()->buildingNumber(),
            'postcode' => fake()->postcode(),
            'city' => fake()->city(),
            'country' => 'Italy',
            'driving_licence' => null,
            'is_approved' => true,
            'remember_token' => Str::random(10),
        ];
    }

    /**
     * Create a new user with CUSTOMER role.
     */
    public function customer(): static
    {
        return $this->afterCreating(function (User $user) {
            $user->assignRole(UserRole::CUSTOMER);
        });
    }

    /**
     * Create a new user with partner role.
     */
    public function partner(): static
    {
        return $this->afterCreating(function (User $user) {
            $user->assignRole(UserRole::PARTNER);
        });
    }

    /**
     * Create a new user with RIDER role.
     */
    public function rider(): static
    {
        return $this->afterCreating(function (User $user) {
            $user->assignRole(UserRole::RIDER);
            $user->update(['driving_licence' => fake()->boolean() ? fake()->numerify('##########') : null]);
        });
    }
}
