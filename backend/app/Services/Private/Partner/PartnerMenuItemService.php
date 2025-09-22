<?php

declare(strict_types=1);

namespace App\Services\Private\Partner;

use App\Models\MenuCategory;
use App\Models\MenuItem;
use App\Services\Shared\ImageService;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\DB;

class PartnerMenuItemService
{
    public function __construct(private ImageService $imageService) {}

    public function createMenuItem(
        MenuCategory $menuCategory,
        ?UploadedFile $image,
        array $data
    ): MenuItem {
        // Handle image upload if provided
        if ($image) {
            $this->imageService->create($image, 'restaurants/menu-items');
        }

        // Get menu item order
        $menuItemOrder = $menuCategory->menuItems()->max('order');
        $data['order'] = $menuItemOrder === null ? 0 : $menuItemOrder + 1;

        // Create menu item
        $menuItem = MenuItem::create([
            ...$data,
            'menu_category_id' => $menuCategory->id,
            'order' => $data['order'],
        ]);

        return $menuItem;
    }

    public function updateMenuItem(
        MenuItem $menuItem,
        ?UploadedFile $image,
        array $data
    ): MenuItem {
        if ($image) {
            $data['image'] = $this->imageService->update(
                $menuItem->image,
                $image,
                'restaurants/menu-items',
                'menu-items/default'
            );
        }

        $menuItem->update($data);

        return $menuItem;
    }

    public function updateMenuItemsOrder(array $menuItems): array
    {
        return DB::transaction(function () use ($menuItems) {
            foreach ($menuItems as $menuItem) {
                $menuItem->save();
            }

            return $menuItems;
        });
    }

    public function deleteMenuItem(MenuItem $menuItem): void
    {
        $this->imageService->delete($menuItem->image, 'menu-items/default');

        $menuItem->delete();

        // Decrement menu items order
        MenuItem::where('menu_category_id', $menuItem->menu_category_id)
            ->where('order', '>', $menuItem->order)
            ->decrement('order');
    }
}
