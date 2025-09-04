<?php

declare(strict_types=1);

namespace App\Services\Partner;

use App\Models\MenuCategory;
use App\Models\MenuItem;
use Illuminate\Http\UploadedFile;

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
}
