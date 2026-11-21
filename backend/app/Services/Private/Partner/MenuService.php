<?php

declare(strict_types=1);

namespace App\Services\Private\Partner;

use App\Models\MenuCategory;
use App\Models\Restaurant;
use Illuminate\Support\Collection;

class MenuService
{
    private const int PER_PAGE = 6;

    /**
     * @return Collection<int, MenuCategory>
     */
    public function getMenu(Restaurant $restaurant): Collection
    {
        return $restaurant->menuCategories()
            ->orderBy('order')
            ->get()
            ->each(function (MenuCategory $menuCategory): void {
                $menuCategory->setRelation(
                    'menuItems',
                    $menuCategory->menuItems()
                        ->orderBy('order')
                        ->paginate(self::PER_PAGE)
                );
            });
    }
}
