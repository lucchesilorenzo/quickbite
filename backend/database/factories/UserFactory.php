<?php

declare(strict_types=1);

namespace Database\Factories;

use App\Enums\UserRole;
use App\Enums\VehicleType;
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
            'phone_number' => '+39 3' . fake()->numerify('##') . ' ' . fake()->numerify('###') . ' ' . fake()->numerify('####'),
            'street_address' => fake()->streetAddress(),
            'building_number' => fake()->buildingNumber(),
            'postcode' => fake()->postcode(),
            'city' => fake()->city(),
            'state' => fake()->state(),
            'country' => 'Italy',
            'vehicle_type' => null,
            'drivers_license' => null,
            'is_approved' => true,
            'remember_token' => Str::random(10),
        ];
    }

    /**
     * Create a new user with CUSTOMER role.
     */
    public function customer(): static
    {
        return $this->afterCreating(function (User $user): void {
            $user->assignRole(UserRole::CUSTOMER);
        });
    }

    /**
     * Create a new user with partner role.
     */
    public function partner(): static
    {
        return $this->afterCreating(function (User $user): void {
            $user->assignRole(UserRole::PARTNER);
        });
    }

    /**
     * Create a new user with RIDER role.
     */
    public function rider(): static
    {
        return $this->afterCreating(function (User $user): void {
            $user->assignRole(UserRole::RIDER);
            $user->update([
                'vehicle_type' => fake()->randomElement(VehicleType::values()),
                'drivers_license' => fake()->numerify('##########'),
            ]);
        });
    }
}
