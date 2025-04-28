<?php

namespace Database\Factories;

use App\Models\Restaurant;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Database\Eloquent\Factories\Sequence;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\RestaurantDeliveryDay>
 */
class RestaurantDeliveryDayFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'restaurant_id' => Restaurant::inRandomOrder()->first()->id,
            'day' => fake()->randomElement(['MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY', 'SUNDAY']),
            'start_time' => fake()->time('H:i'),
            'end_time' => fake()->time('H:i'),
        ];
    }

    /**
     * Indicate that the model should be full week.
     *
     * @return self
     */
    public function fullWeek(): self
    {
        return $this->state(new Sequence(
            ['day' => 'MONDAY', 'start_time' => '10:00:00', 'end_time' => '22:00:00'],
            ['day' => 'TUESDAY', 'start_time' => '10:00:00', 'end_time' => '22:00:00'],
            ['day' => 'WEDNESDAY', 'start_time' => '10:00:00', 'end_time' => '22:00:00'],
            ['day' => 'THURSDAY', 'start_time' => '10:00:00', 'end_time' => '22:00:00'],
            ['day' => 'FRIDAY', 'start_time' => '10:00:00', 'end_time' => '23:00:00'],
            ['day' => 'SATURDAY', 'start_time' => '10:00:00', 'end_time' => '23:00:00'],
            ['day' => 'SUNDAY', 'start_time' => null, 'end_time' => null],
        ));
    }
}
