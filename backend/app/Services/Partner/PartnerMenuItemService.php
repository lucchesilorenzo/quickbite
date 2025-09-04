<?php

declare(strict_types=1);

namespace App\Services\Partner;

use App\Models\MenuCategory;
use App\Models\MenuItem;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;

class PartnerMenuItemService
{
    public function createMenuItem(
        MenuCategory $menuCategory,
        ?UploadedFile $image,
        array $data
    ): MenuItem {
        // Handle image upload if provided
        if ($image) {
            $path = $image->store('restaurants/menu-items', 'public');
            $data['image'] = '/storage/' . $path;
        }

        // Get menu item order
        $menuItemOrder = $menuCategory->menuItems()->max('order');
        $data['order'] = is_null($menuItemOrder) ? 0 : $menuItemOrder + 1;

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
            // Delete old image, only if it's not a default image
            if ($menuItem->image && ! str_contains($menuItem->image, 'menu-items/default')) {
                $oldImagePath = str_replace('/storage/', '', $menuItem->image);

                if (Storage::disk('public')->exists($oldImagePath)) {
                    Storage::disk('public')->delete($oldImagePath);
                }
            }

            // Upload new image
            $path = $image->store('restaurants/menu-items', 'public');
            $data['image'] = '/storage/' . $path;
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
}
