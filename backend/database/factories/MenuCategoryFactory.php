<?php

namespace Database\Factories;

use App\Models\MenuCategory;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Facades\Storage;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\MenuCategory>
 */
class MenuCategoryFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        static $menuCategories = [
            'Starters',
            'Main Courses',
            'Desserts',
            'Drinks',
            'Sides',
            'Salads',
        ];

        static $i = 0;

        return [
            'name' => $menuCategories[$i % count($menuCategories)],
            'description' => fake()->sentence(),
            'order' => $i++,
        ];
    }

    /**
     * Configure the model factory.
     *
     * @return self
     */
    public function configure(): self
    {
        return $this->afterCreating(function (MenuCategory $menuCategory) {
            $menuItems = $this->getMenuItemsForCategory($menuCategory->name);

            $menuCategory->menuItems()->createMany($menuItems);
        });
    }

    /**
     * Get the menu items for the menu category.
     *
     * @param string $categoryName
     * @return array
     */
    private function getMenuItemsForCategory(string $categoryName): array
    {
        $menuItems = [];

        switch ($categoryName) {
            case 'Starters':
                $menuItems = [
                    [
                        'name' => 'Bruschetta',
                        'description' => 'Toasted bread with tomatoes and basil',
                        'price' => 5.99,
                        'image' => Storage::url('restaurants/menu-items/bruschetta.jpg'),
                        'is_available' => true,
                    ],
                    [
                        'name' => 'Garlic Bread',
                        'description' => 'Garlic butter spread on warm bread',
                        'price' => 4.50,
                        'image' => Storage::url('restaurants/menu-items/garlic-bread.jpg'),
                        'is_available' => true,
                    ],
                ];
                break;

            case 'Main Courses':
                $menuItems = [
                    [
                        'name' => 'Lasagna',
                        'description' => 'Classic Italian lasagna with beef and ricotta',
                        'price' => 12.99,
                        'image' => Storage::url('restaurants/menu-items/lasagna.jpg'),
                        'is_available' => true,
                    ],
                    [
                        'name' => 'Grilled Chicken',
                        'description' => 'Tender grilled chicken with seasonal vegetables',
                        'price' => 15.50,
                        'image' => Storage::url('restaurants/menu-items/grilled-chicken.jpg'),
                        'is_available' => true,
                    ],
                ];
                break;

            case 'Desserts':
                $menuItems = [
                    [
                        'name' => 'Tiramisu',
                        'description' => 'Coffee-flavored Italian dessert',
                        'price' => 6.50,
                        'image' => Storage::url('restaurants/menu-items/tiramisu.jpg'),
                        'is_available' => true,
                    ],
                    [
                        'name' => 'Panna Cotta',
                        'description' => 'Creamy Italian custard topped with berries',
                        'price' => 5.00,
                        'image' => Storage::url('restaurants/menu-items/panna-cotta.jpg'),
                        'is_available' => true,
                    ],
                ];
                break;

            case 'Drinks':
                $menuItems = [
                    [
                        'name' => 'Espresso',
                        'description' => 'Strong Italian coffee',
                        'price' => 2.50,
                        'image' => Storage::url('restaurants/menu-items/espresso.jpg'),
                        'is_available' => true,
                    ],
                    [
                        'name' => 'Lemonade',
                        'description' => 'Refreshing lemon drink',
                        'price' => 3.00,
                        'image' => Storage::url('restaurants/menu-items/lemonade.jpg'),
                        'is_available' => true,
                    ],
                ];
                break;

            case 'Sides':
                $menuItems = [
                    [
                        'name' => 'French Fries',
                        'description' => 'Crispy fried potatoes',
                        'price' => 3.99,
                        'image' => Storage::url('restaurants/menu-items/french-fries.jpg'),
                        'is_available' => true,
                    ],
                    [
                        'name' => 'Coleslaw',
                        'description' => 'Creamy cabbage salad',
                        'price' => 4.20,
                        'image' => Storage::url('restaurants/menu-items/coleslaw.jpg'),
                        'is_available' => true,
                    ],
                ];
                break;

            case 'Salads':
                $menuItems = [
                    [
                        'name' => 'Caesar Salad',
                        'description' => 'Romaine lettuce with Caesar dressing',
                        'price' => 6.99,
                        'image' => Storage::url('restaurants/menu-items/caesar-salad.jpg'),
                        'is_available' => true,
                    ],
                    [
                        'name' => 'Greek Salad',
                        'description' => 'Cucumbers, tomatoes, and feta cheese',
                        'price' => 7.50,
                        'image' => Storage::url('restaurants/menu-items/greek-salad.jpg'),
                        'is_available' => true,
                    ],
                ];
                break;
        }

        return $menuItems;
    }
}
