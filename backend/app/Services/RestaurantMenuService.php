<?php

declare(strict_types=1);

namespace App\Services;

use App\Models\Restaurant;

class RestaurantMenuService
{
    public function getRestaurantMenu(Restaurant $restaurant): array
    {
        $menu = $restaurant->menuCategories()
            ->orderBy('order', 'asc')
            ->get();

        foreach ($menu as $menuCategory) {
            $menuCategory->menu_items = $menuCategory->menuItems()
                ->orderBy('order', 'asc')
                ->get();
        }

        return $menu;
    }
}
