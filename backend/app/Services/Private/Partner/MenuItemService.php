<?php

declare(strict_types=1);

namespace App\Services\Private\Partner;

use App\Models\MenuCategory;
use App\Models\MenuItem;
use App\Services\Shared\FileService;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\DB;
use Throwable;

class MenuItemService
{
    public function __construct(
        private readonly FileService $fileService
    ) {}

    public function createMenuItem(
        array $data,
        MenuCategory $menuCategory,
    ): MenuItem {
        $imagePath = null;

        try {
            if (isset($data['image']) && $data['image'] instanceof UploadedFile) {
                $imagePath = $data['image']->store('restaurants/menu-items', 'public');
                $data['image'] = $imagePath;
            }

            $menuItemOrder = $menuCategory->menuItems()->max('order');
            $data['order'] = $menuItemOrder === null ? 0 : $menuItemOrder + 1;

            return MenuItem::query()->create([
                ...$data,
                'menu_category_id' => $menuCategory->id,
                'order' => $data['order'],
            ])->refresh();
        } catch (Throwable $e) {
            if ($imagePath !== null) {
                $this->fileService->delete($imagePath, 'public');
            }

            throw $e;
        }
    }

    public function updateMenuItem(
        array $data,
        MenuItem $menuItem,
    ): MenuItem {
        $newImagePath = null;
        $oldImagePath = $menuItem->image;

        try {
            if ($data['image'] instanceof UploadedFile) {
                $newImagePath = $data['image']->store('restaurants/menu-items', 'public');
                $data['image'] = $newImagePath;
            }

            $menuItem->update($data);

            if ($newImagePath && $oldImagePath) {
                $this->fileService->delete(
                    $oldImagePath,
                    'public',
                    'menu-items/default'
                );
            }

            return $menuItem;
        } catch (Throwable $e) {
            if ($newImagePath) {
                $this->fileService->delete($newImagePath, 'public');
            }

            throw $e;
        }
    }

    public function updateMenuItemsOrder(array $menuItems): array
    {
        return DB::transaction(function () use ($menuItems): array {
            foreach ($menuItems as $menuItem) {
                $menuItem->save();
            }

            return collect($menuItems)
                ->pluck('id')
                ->all();
        });
    }

    public function deleteMenuItem(MenuItem $menuItem): void
    {
        $this->fileService->delete($menuItem->image, 'public', 'menu-items/default');

        $menuItem->delete();

        // Decrement menu items order
        MenuItem::query()
            ->where('menu_category_id', $menuItem->menu_category_id)
            ->where('order', '>', $menuItem->order)
            ->decrement('order');
    }
}
