<?php

declare(strict_types=1);

namespace App\Services\Private\Partner;

use App\Models\MenuCategory;
use App\Models\MenuItem;
use App\Services\Shared\ImageService;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\DB;

class MenuItemService
{
    public function __construct(
        private readonly ImageService $imageService
    ) {}

    public function createMenuItem(
        array $data,
        MenuCategory $menuCategory,
        ?UploadedFile $image,
    ): MenuItem {
        // Handle image upload if provided
        if ($image instanceof UploadedFile) {
            $this->imageService->create($image, 'restaurants/menu-items');
        }

        // Get menu item order
        $menuItemOrder = $menuCategory->menuItems()->max('order');
        $data['order'] = $menuItemOrder === null ? 0 : $menuItemOrder + 1;

        return MenuItem::query()->create([
            ...$data,
            'menu_category_id' => $menuCategory->id,
            'order' => $data['order'],
        ]);
    }

    public function updateMenuItem(
        array $data,
        MenuItem $menuItem,
        ?UploadedFile $image,
    ): MenuItem {
        if ($image instanceof UploadedFile) {
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
        return DB::transaction(function () use ($menuItems): array {
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
        MenuItem::query()
            ->where('menu_category_id', $menuItem->menu_category_id)
            ->where('order', '>', $menuItem->order)
            ->decrement('order');
    }
}
