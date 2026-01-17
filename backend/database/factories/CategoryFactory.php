<?php

declare(strict_types=1);

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
            'image' => '',
            'is_default' => fake()->boolean(),
        ];
    }

    /**
     * Configure the model factory.
     */
    public function configure(): self
    {
        return $this->state(new Sequence(
            [
                'name' => 'Pizza',
                'slug' => 'pizza',
                'image' => 'category-filters/default/pizza.jpg',
                'is_default' => true,
            ],
            [
                'name' => 'Hamburger',
                'slug' => 'hamburger',
                'image' => 'category-filters/default/hamburger.jpg',
                'is_default' => true,
            ],
            [
                'name' => 'Sushi',
                'slug' => 'sushi',
                'image' => 'category-filters/default/sushi.jpg',
                'is_default' => true,
            ],
            [
                'name' => 'Chinese',
                'slug' => 'chinese',
                'image' => 'category-filters/default/chinese.jpg',
                'is_default' => true,
            ],
            [
                'name' => 'Desserts',
                'slug' => 'desserts',
                'image' => 'category-filters/default/desserts.jpg',
                'is_default' => true,
            ],
            [
                'name' => 'Drinks',
                'slug' => 'drinks',
                'image' => 'category-filters/default/drinks.jpg',
                'is_default' => true,
            ],
            [
                'name' => 'Thai',
                'slug' => 'thai',
                'image' => 'category-filters/default/thai.jpg',
                'is_default' => true,
            ],
            [
                'name' => 'Mexican',
                'slug' => 'mexican',
                'image' => 'category-filters/default/mexican.jpg',
                'is_default' => false,
            ]
        ));
    }
}
