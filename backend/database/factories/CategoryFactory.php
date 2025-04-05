<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Database\Eloquent\Factories\Sequence;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Category>
 */
class CategoryFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'name' => fake()->words(2, true),
            'slug' => fake()->slug(),
        ];
    }

    /**
     * Configure the model factory.
     *
     * @return self
     */
    public function configure(): self
    {
        return $this->state(new Sequence(
            [
                'name' => 'Pizza',
                'slug' => 'pizza',
            ],
            [
                'name' => 'Hamburger',
                'slug' => 'hamburger',
            ],
            [
                'name' => 'Sushi',
                'slug' => 'sushi',
            ],
            [
                'name' => 'Chinese',
                'slug' => 'chinese',
            ],
            [
                'name' => 'Dessert',
                'slug' => 'dessert',
            ],
            [
                'name' => 'Drinks',
                'slug' => 'drinks',
            ],
            [
                'name' => 'Thai',
                'slug' => 'thai',
            ],
            [
                'name' => 'Mexican',
                'slug' => 'mexican',
            ]
        ));
    }
}
