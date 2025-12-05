<?php

declare(strict_types=1);

namespace App\Services\Private\Partner;

use App\Exceptions\Private\Partner\MenuCategoryOrderExceededException;
use App\Models\MenuCategory;
use App\Models\Restaurant;
use Illuminate\Support\Facades\DB;

class MenuCategoryService
{
    private const int MAX_MENU_CATEGORIES_ORDER = 8;

    public function createMenuCategory(array $data, Restaurant $restaurant): MenuCategory
    {
        // Get menu category order
        $menuCategoryOrder = $restaurant->menuCategories()->max('order');

        if ($menuCategoryOrder === self::MAX_MENU_CATEGORIES_ORDER) {
            throw new MenuCategoryOrderExceededException;
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

            return collect($menuCategories)
                ->pluck('id')
                ->all();
        });
    }

    public function updateMenuCategory(array $data, MenuCategory $menuCategory): MenuCategory
    {
        $menuCategory->update($data);

        return $menuCategory->fresh();
    }

    public function deleteMenuCategory(MenuCategory $menuCategory): void
    {
        $menuCategory->delete();

        // Decrement menu categories order
        MenuCategory::query()
            ->where('restaurant_id', $menuCategory->restaurant_id)
            ->where('order', '>', $menuCategory->order)
            ->decrement('order');
    }
}
