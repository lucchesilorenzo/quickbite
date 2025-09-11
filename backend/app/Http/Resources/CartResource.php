<?php

declare(strict_types=1);

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

/**
 * @mixin \App\Models\Cart
 */
class CartResource extends JsonResource
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
            'restaurant' => $this->restaurant,
            'total_items' => $this->total_items,
            'total_unique_items' => $this->total_unique_items,
            'cart_total' => $this->cart_total,
            'items' => CartItemResource::collection($this->cartItems),
        ];
    }
}
