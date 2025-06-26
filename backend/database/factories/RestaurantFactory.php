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
            'min_amount' => fake()->randomFloat(2, 0, 50),
            'shipping_cost' => fake()->randomFloat(2, 0, 10),
            'delivery_time_min' => fake()->randomElement([10, 15]),
            'delivery_time_max' => fake()->randomElement([15, 20, 25, 30]),
            'discount' => fake()->randomElement([0, 0.05, 0.1, 0.15]),
            'min_discount_amount' => fn(array $attributes) => $attributes['discount'] === 0 ? 0 : fake()->randomElement([30, 50, 70]),
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
            $this->assignRestaurateursToRestaurant($restaurant);
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
     * Assign restaurateurs to restaurant.
     *
     * @param Restaurant $restaurant
     * @return void
     */
    private function assignRestaurateursToRestaurant(Restaurant $restaurant): void
    {
        // Get restaurateurs
        $restaurateurs = User::role(RolesEnum::RESTAURATEUR)
            ->inRandomOrder()
            ->pluck('id');

        // Check if the restaurant already has an owner
        $hasOwner = $restaurant->restaurateurs()
            ->wherePivot('role', RestaurantRolesEnum::OWNER)
            ->exists();

        // Check if the restaurant already has a co-owner
        $hasCoOwner = $restaurant->restaurateurs()
            ->wherePivot('role', RestaurantRolesEnum::CO_OWNER)
            ->exists();

        // Assign owner
        if (!$hasOwner && $restaurateurs->isNotEmpty()) {
            $ownerId = $restaurateurs->random();

            $restaurant->restaurateurs()->attach($ownerId, [
                'role' => RestaurantRolesEnum::OWNER,
            ]);

            // Remove owner from restaurateurs (to avoid duplicates)
            $restaurateurs = $restaurateurs->filter(fn($id) => $id !== $ownerId);
        }

        // Assign co-owner
        if (!$hasCoOwner && $restaurateurs->isNotEmpty()) {
            $coOwnerId = $restaurateurs->random();

            $restaurant->restaurateurs()->attach($coOwnerId, [
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
