<?php

declare(strict_types=1);

namespace App\Services\Partner;

use App\Models\Restaurant;
use Illuminate\Support\Collection;

class PartnerMenuService
{
    private const PER_PAGE = 6;

    public function getMenu(Restaurant $restaurant): Collection
    {
        return $restaurant->menuCategories()
            ->orderBy('order')
            ->get()
            ->map(function ($category) {
                $category->menu_items = $category->menuItems()
                    ->orderBy('order')
                    ->paginate(self::PER_PAGE);

                return $category;
            });
    }
}
