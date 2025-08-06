<?php

declare(strict_types=1);

namespace Database\Factories;

use App\Enums\DeliveryDay;
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
            'day' => fake()->randomElement(DeliveryDay::values()),
            'start_time' => fake()->time('H:i'),
            'end_time' => fake()->time('H:i'),
        ];
    }

    /**
     * Indicate that the model should be full week.
     */
    public function fullWeek(): self
    {
        return $this->state(new Sequence(
            ['day' => DeliveryDay::MONDAY, 'start_time' => '10:00:00', 'end_time' => '22:00:00', 'order' => 0],
            ['day' => DeliveryDay::TUESDAY, 'start_time' => '10:00:00', 'end_time' => '22:00:00', 'order' => 1],
            ['day' => DeliveryDay::WEDNESDAY, 'start_time' => '10:00:00', 'end_time' => '22:00:00', 'order' => 2],
            ['day' => DeliveryDay::THURSDAY, 'start_time' => '10:00:00', 'end_time' => '22:00:00', 'order' => 3],
            ['day' => DeliveryDay::FRIDAY, 'start_time' => '10:00:00', 'end_time' => '23:00:00', 'order' => 4],
            ['day' => DeliveryDay::SATURDAY, 'start_time' => '10:00:00', 'end_time' => '23:00:00', 'order' => 5],
            ['day' => DeliveryDay::SUNDAY, 'start_time' => null, 'end_time' => null, 'order' => 6],
        ));
    }
}
