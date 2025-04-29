<?php

namespace Database\Factories;

use App\Models\Category;
use App\Models\Restaurant;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Facades\Storage;

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
            'street_address' => 'Via Roma',
            'building_number' => '4',
            'postcode' => '04049',
            'neighbourhood' => 'Borgo Cipollata',
            'county' => 'Latina',
            'city' => 'Terracina',
            'state' => 'Lazio',
            'country' => 'Italy',
            'full_address' => 'Via Roma, 3, 04049 Terracina',
            'latitude' => 43.72265,
            'longitude' => 10.4016155,
            'phone_number' => fake()->e164PhoneNumber(),
            'email' => fake()->unique()->safeEmail(),
            'vat_id' => fake()->numerify('##########'),
            'min_amount' => fake()->randomFloat(2, 0, 50),
            'shipping_cost' => fake()->randomFloat(2, 0, 10),
            'logo' => Storage::url('restaurants/logos/logo.jpg'),
            'cover' => Storage::url('restaurants/covers/hamburger.jpg'),
            'discount' => null,
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
        $restaurateurs = User::inRandomOrder()
            ->where('role', 'RESTAURATEUR')
            ->pluck('id');

        // Check if the restaurant already has an owner
        $hasOwner = $restaurant->restaurateurs()
            ->wherePivot('role', 'OWNER')
            ->exists();

        // Check if the restaurant already has a co-owner
        $hasCoOwner = $restaurant->restaurateurs()
            ->wherePivot('role', 'CO-OWNER')
            ->exists();

        // Assign owner
        if (!$hasOwner && $restaurateurs->isNotEmpty()) {
            $ownerId = $restaurateurs->random();

            $restaurant->restaurateurs()->attach($ownerId, [
                'role' => 'OWNER',
            ]);

            // Remove owner from restaurateurs (to avoid duplicates)
            $restaurateurs = $restaurateurs->filter(fn($id) => $id !== $ownerId);
        }

        // Assign co-owner
        if (!$hasCoOwner && $restaurateurs->isNotEmpty()) {
            $coOwnerId = $restaurateurs->random();

            $restaurant->restaurateurs()->attach($coOwnerId, [
                'role' => 'CO-OWNER',
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
        $riders = User::inRandomOrder()
            ->where('role', 'RIDER')
            ->pluck('id');

        $restaurant->riders()->attach($riders, [
            'role' => 'RIDER',
            'contract_start' => now(),
            'contract_end' => now()->addDays(30),
            'is_active' => true,
        ]);
    }
}
