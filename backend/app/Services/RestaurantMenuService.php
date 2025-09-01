<?php

declare(strict_types=1);

namespace App\Services;

use App\Models\Restaurant;
use Illuminate\Support\Collection;

class RestaurantMenuService
{
    public function getMenu(Restaurant $restaurant): Collection
    {
        $menu = $restaurant->menuCategories()
            ->orderBy('order')
            ->with([
                'menuItems' => fn ($q) => $q->orderBy('order'),
            ])
            ->get();

        return $menu;
    }
}
