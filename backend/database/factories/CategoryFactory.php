<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Database\Eloquent\Factories\Sequence;
use Illuminate\Support\Facades\Storage;

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
            'image' => "",
            'is_default' => fake()->boolean(),
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
                'image' => Storage::url('category-filters/pizza.jpg'),
                'is_default' => true,
            ],
            [
                'name' => 'Hamburger',
                'slug' => 'hamburger',
                'image' => Storage::url('category-filters/hamburger.jpg'),
                'is_default' => true,
            ],
            [
                'name' => 'Sushi',
                'slug' => 'sushi',
                'image' => Storage::url('category-filters/sushi.jpg'),
                'is_default' => true,
            ],
            [
                'name' => 'Chinese',
                'slug' => 'chinese',
                'image' => Storage::url('category-filters/chinese.jpg'),
                'is_default' => true,
            ],
            [
                'name' => 'Desserts',
                'slug' => 'desserts',
                'image' => Storage::url('category-filters/desserts.jpg'),
                'is_default' => true,
            ],
            [
                'name' => 'Drinks',
                'slug' => 'drinks',
                'image' => Storage::url('category-filters/drinks.jpg'),
                'is_default' => true,
            ],
            [
                'name' => 'Thai',
                'slug' => 'thai',
                'image' => Storage::url('category-filters/thai.jpg'),
                'is_default' => true,
            ],
            [
                'name' => 'Mexican',
                'slug' => 'mexican',
                'image' => Storage::url('category-filters/mexican.jpg'),
                'is_default' => false,
            ]
        ));
    }
}
