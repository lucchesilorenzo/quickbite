<?php

declare(strict_types=1);

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class CartItemResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->menuItem->id,
            'menu_category_id' => $this->menuItem->menu_category_id,
            'name' => $this->menuItem->name,
            'description' => $this->menuItem->description,
            'price' => $this->menuItem->price,
            'image' => $this->menuItem->image,
            'is_available' => $this->menuItem->is_available,
            'quantity' => $this->quantity,
            'item_total' => $this->item_total,
        ];
    }
}
