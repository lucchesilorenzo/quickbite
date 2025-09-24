<?php

declare(strict_types=1);

namespace App\Services\Private\Partner;

use App\Models\MenuCategory;
use App\Models\Restaurant;
use Illuminate\Support\Collection;

class PartnerMenuService
{
    private const int PER_PAGE = 6;

    public function getMenu(Restaurant $restaurant): Collection
    {
        return $restaurant->menuCategories()
            ->orderBy('order')
            ->get()
            ->map(function ($category): MenuCategory {
                $category->menu_items = $category->menuItems()
                    ->orderBy('order')
                    ->paginate(self::PER_PAGE);

                return $category;
            });
    }
}
