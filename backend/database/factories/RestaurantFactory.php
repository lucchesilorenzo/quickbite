<?php

namespace Database\Factories;

use App\Enums\RestaurantRolesEnum;
use App\Enums\RolesEnum;
use App\Models\Category;
use App\Models\Restaurant;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

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
        static $logoNumber = 1;
        static $coverNumber = 1;

        return [
            'id' => Str::orderedUuid(),
            'name' => fake()->company(),
            'slug' => fn(array $attributes) => Str::slug($attributes['name'] . '-' . $attributes['id']),
            'description' => fake()->sentence(),
            'street_address' => 'Via Santa Maria',
            'building_number' => '2',
            'postcode' => '56126',
            'neighbourhood' => 'Pisa',
            'county' => 'Pisa',
            'city' => 'Pisa',
            'state' => 'Tuscany',
            'country' => 'Italy',
            'full_address' => 'Via Santa Maria 2, 56126 Pisa',
            'latitude' => fake()->randomFloat(6, 43.7050, 43.7120),
            'longitude' => fake()->randomFloat(6, 10.4000, 10.4100),
            'phone_number' => fake()->e164PhoneNumber(),
            'email' => fake()->unique()->safeEmail(),
            'vat_id' => fake()->numerify('##########'),
            'min_amount' => fake()->randomElement([30, 40, 50]),
            'delivery_fee' => fake()->randomElement([0, 2.99, 4.99]),
            'service_fee' => fake()->randomElement([0, 0.30, 0.50, 0.75, 1.00]),
            'delivery_time_min' => fake()->randomElement([10, 15]),
            'delivery_time_max' => fake()->randomElement([15, 20, 25, 30]),
            'discount_rate' => fake()->randomElement([0, 0.05, 0.1, 0.15]),
            'min_discount_amount' => fn(array $attributes) => $attributes['discount_rate'] === 0 ? 0 : fake()->randomElement([30, 50, 70]),
            'logo' => Storage::url('restaurants/logos/logo' . $logoNumber++ . '.jpg'),
            'cover' => Storage::url('restaurants/covers/cover' . $coverNumber++ . '.jpg'),
        ];
    }

    /**
     * Configure the model factory.
     *
     * @return self
     */
    public function configure(): self
    {
        return $this->afterCreating(function (Restaurant $restaurant) {
            $this->assignCategoriesToRestaurant($restaurant);
            $this->assignPartnersToRestaurant($restaurant);
            $this->assignRidersToRestaurant($restaurant);
        });
    }

    /**
     * Assign categories to restaurant. 
     *
     * @param Restaurant $restaurant
     * @return void
     */
    private function assignCategoriesToRestaurant(Restaurant $restaurant): void
    {
        $categories = Category::inRandomOrder()
            ->take(rand(1, 3))
            ->pluck('id');

        $restaurant->categories()->attach($categories);
    }

    /**
     * Assign partners to restaurant.
     *
     * @param Restaurant $restaurant
     * @return void
     */
    private function assignPartnersToRestaurant(Restaurant $restaurant): void
    {
        // Get partners
        $partners = User::role(RolesEnum::PARTNER)
            ->inRandomOrder()
            ->pluck('id');

        // Check if the restaurant already has an owner
        $hasOwner = $restaurant->partners()
            ->wherePivot('role', RestaurantRolesEnum::OWNER)
            ->exists();

        // Check if the restaurant already has a co-owner
        $hasCoOwner = $restaurant->partners()
            ->wherePivot('role', RestaurantRolesEnum::CO_OWNER)
            ->exists();

        // Assign owner
        if (!$hasOwner && $partners->isNotEmpty()) {
            $ownerId = $partners->random();

            $restaurant->partners()->attach($ownerId, [
                'role' => RestaurantRolesEnum::OWNER,
            ]);

            // Remove owner from partners (to avoid duplicates)
            $partners = $partners->filter(fn($id) => $id !== $ownerId);
        }

        // Assign co-owner
        if (!$hasCoOwner && $partners->isNotEmpty()) {
            $coOwnerId = $partners->random();

            $restaurant->partners()->attach($coOwnerId, [
                'role' => RestaurantRolesEnum::CO_OWNER,
            ]);
        }
    }

    /**
     * Assign riders to restaurant.
     *
     * @param Restaurant $restaurant
     * @return void
     */
    private function assignRidersToRestaurant(Restaurant $restaurant): void
    {
        // Get riders
        $riders = User::role(RolesEnum::RIDER)
            ->inRandomOrder()
            ->pluck('id');

        $restaurant->riders()->attach($riders, [
            'role' => RestaurantRolesEnum::RIDER,
            'contract_start' => now(),
            'contract_end' => now()->addDays(30),
            'is_active' => true,
        ]);
    }
}
