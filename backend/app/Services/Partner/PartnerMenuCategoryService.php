<?php

declare(strict_types=1);

namespace App\Services\Partner;

use App\Models\MenuCategory;
use App\Models\Restaurant;
use Exception;

class PartnerMenuCategoryService
{
    public function createMenuCategory(Restaurant $restaurant, array $data): MenuCategory
    {
        // Get menu category order
        $menuCategoryOrder = $restaurant->menuCategories()->max('order');

        if ($menuCategoryOrder === 8) {
            throw new Exception(
                'You have reached the maximum number of menu categories.',
                422
            );
        }

        $data['order'] = is_null($menuCategoryOrder) ? 0 : $menuCategoryOrder + 1;

        // Create menu category
        $menuCategory = $restaurant->menuCategories()->create([
            ...$data,
            'order' => $data['order'],
        ]);

        return $menuCategory;
    }
}
