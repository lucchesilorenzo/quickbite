<?php

declare(strict_types=1);

namespace App\Services\Private\Partner;

use App\Exceptions\Private\Partner\PartnerMenuCategoryOrderExceededException;
use App\Models\MenuCategory;
use App\Models\Restaurant;
use Illuminate\Support\Facades\DB;

class PartnerMenuCategoryService
{
    public function createMenuCategory(array $data, Restaurant $restaurant): MenuCategory
    {
        // Get menu category order
        $menuCategoryOrder = $restaurant->menuCategories()->max('order');

        if ($menuCategoryOrder === 8) {
            throw new PartnerMenuCategoryOrderExceededException;
        }

        $data['order'] = $menuCategoryOrder === null ? 0 : $menuCategoryOrder + 1;

        return $restaurant->menuCategories()->create([
            ...$data,
            'order' => $data['order'],
        ]);
    }

    public function updateMenuCategoriesOrder(array $menuCategories): array
    {
        return DB::transaction(function () use ($menuCategories): array {
            foreach ($menuCategories as $menuCategory) {
                $menuCategory->save();
            }

            return $menuCategories;
        });
    }

    public function updateMenuCategory(array $data, MenuCategory $menuCategory): MenuCategory
    {
        $menuCategory->update($data);

        return $menuCategory;
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
