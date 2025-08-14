<?php

declare(strict_types=1);

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
        $menuCategories = [
            'Starters' => 'Tasty small dishes to begin your meal.',
            'Main Courses' => 'Hearty and satisfying main dishes.',
            'Drinks' => 'Refreshing beverages to pair with your food.',
            'Sides' => 'Complementary sides to enhance your dish.',
            'Salads' => 'Fresh and crisp salads for a light option.',
            'Desserts' => 'Sweet treats to end your meal perfectly.',
        ];

        static $i = 0;

        if ($i >= count($menuCategories)) {
            $i = 0;
        }

        return [
            'name' => array_keys($menuCategories)[($i % count($menuCategories))],
            'description' => array_values($menuCategories)[($i % count($menuCategories))],
            'order' => $i++,
        ];
    }

    /**
     * Configure the model factory.
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
                        'price' => 6.50,
                        'image' => Storage::url('restaurants/menu-items/default/bruschetta.jpg'),
                        'is_available' => true,
                        'order' => 0,

                    ],
                    [
                        'name' => 'Garlic Bread',
                        'description' => 'Garlic butter spread on warm bread',
                        'price' => 5.00,
                        'image' => Storage::url('restaurants/menu-items/default/garlic-bread.jpg'),
                        'is_available' => true,
                        'order' => 1,
                    ],
                ];
                break;

            case 'Main Courses':
                $menuItems = [
                    [
                        'name' => 'Lasagna',
                        'description' => 'Classic Italian lasagna with beef and ricotta',
                        'price' => 13.90,
                        'image' => Storage::url('restaurants/menu-items/default/lasagna.jpg'),
                        'is_available' => true,
                        'order' => 0,
                    ],
                    [
                        'name' => 'Grilled Chicken',
                        'description' => 'Tender grilled chicken with seasonal vegetables',
                        'price' => 15.90,
                        'image' => Storage::url('restaurants/menu-items/default/grilled-chicken.jpg'),
                        'is_available' => true,
                        'order' => 1,
                    ],
                    [
                        'name' => 'Margherita Pizza',
                        'description' => 'Classic pizza with tomato, mozzarella and fresh basil',
                        'price' => 8.00,
                        'image' => Storage::url('restaurants/menu-items/default/pizza.jpg'),
                        'is_available' => true,
                        'order' => 2,
                    ],
                ];
                break;

            case 'Drinks':
                $menuItems = [
                    [
                        'name' => 'Espresso',
                        'description' => 'Strong Italian coffee',
                        'price' => 1.50,
                        'image' => Storage::url('restaurants/menu-items/default/espresso.jpg'),
                        'is_available' => true,
                        'order' => 0,
                    ],
                    [
                        'name' => 'Chianti Red Wine',
                        'description' => 'A glass of classic Tuscan Chianti red wine',
                        'price' => 4.50,
                        'image' => Storage::url('restaurants/menu-items/default/chianti.jpg'),
                        'is_available' => true,
                        'order' => 1,
                    ],
                ];
                break;

            case 'Sides':
                $menuItems = [
                    [
                        'name' => 'French Fries',
                        'description' => 'Crispy fried potatoes',
                        'price' => 4.00,
                        'image' => Storage::url('restaurants/menu-items/default/french-fries.jpg'),
                        'is_available' => true,
                        'order' => 0,
                    ],
                    [
                        'name' => 'Coleslaw',
                        'description' => 'Creamy cabbage salad',
                        'price' => 3.50,
                        'image' => Storage::url('restaurants/menu-items/default/coleslaw.jpg'),
                        'is_available' => true,
                        'order' => 1,
                    ],
                ];
                break;

            case 'Salads':
                $menuItems = [
                    [
                        'name' => 'Caesar Salad',
                        'description' => 'Romaine lettuce with Caesar dressing',
                        'price' => 7.00,
                        'image' => Storage::url('restaurants/menu-items/default/caesar-salad.jpg'),
                        'is_available' => true,
                        'order' => 0,
                    ],
                    [
                        'name' => 'Greek Salad',
                        'description' => 'Cucumbers, tomatoes, and feta cheese',
                        'price' => 7.50,
                        'image' => Storage::url('restaurants/menu-items/default/greek-salad.jpg'),
                        'is_available' => true,
                        'order' => 1,
                    ],
                ];
                break;

            case 'Desserts':
                $menuItems = [
                    [
                        'name' => 'Tiramisu',
                        'description' => 'Coffee-flavored Italian dessert',
                        'price' => 6.00,
                        'image' => Storage::url('restaurants/menu-items/default/tiramisu.jpg'),
                        'is_available' => true,
                        'order' => 0,
                    ],
                    [
                        'name' => 'Panna Cotta',
                        'description' => 'Creamy Italian custard topped with berries',
                        'price' => 5.50,
                        'image' => Storage::url('restaurants/menu-items/default/panna-cotta.jpg'),
                        'is_available' => true,
                        'order' => 1,
                    ],
                ];
                break;
        }

        return collect($menuItems)->shuffle()->take(rand(1, 2))->values()->toArray();
    }
}
