<?php

declare(strict_types=1);

namespace App\Services\Private\Partner;

use App\Models\MenuCategory;
use App\Models\Restaurant;
use Exception;
use Illuminate\Support\Facades\DB;

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

        $data['order'] = $menuCategoryOrder === null ? 0 : $menuCategoryOrder + 1;

        /** @var MenuCategory $menuCategory */
        $menuCategory = $restaurant->menuCategories()->create([
            ...$data,
            'order' => $data['order'],
        ]);

        return $menuCategory;
    }

    public function updateMenuCategoriesOrder(array $menuCategories): array
    {
        return DB::transaction(function () use ($menuCategories) {
            foreach ($menuCategories as $menuCategory) {
                $menuCategory->save();
            }

            return $menuCategories;
        });
    }

    public function deleteMenuCategory(MenuCategory $menuCategory): void
    {
        $menuCategory->delete();

        // Decrement menu categories order
        MenuCategory::where('restaurant_id', $menuCategory->restaurant_id)
            ->where('order', '>', $menuCategory->order)
            ->decrement('order');
    }
}
