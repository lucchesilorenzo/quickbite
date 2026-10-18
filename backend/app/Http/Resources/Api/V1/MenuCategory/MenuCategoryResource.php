<?php

declare(strict_types=1);

namespace App\Http\Resources\Api\V1\MenuCategory;

use App\Http\Resources\Api\V1\MenuItemResource;
use App\Models\MenuCategory;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

/**
 * @mixin MenuCategory
 */
class MenuCategoryResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'restaurant_id' => $this->restaurant_id,
            'name' => $this->name,
            'description' => $this->description,
            'order' => $this->order,
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
            'menu_items' => MenuItemResource::collection(
                $this->whenLoaded('menuItems')
            ),
        ];
    }
}
