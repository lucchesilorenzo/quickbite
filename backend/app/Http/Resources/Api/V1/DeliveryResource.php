<?php

declare(strict_types=1);

namespace App\Http\Resources\Api\V1;

use App\Models\Delivery;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

/**
 * @mixin Delivery
 */
class DeliveryResource extends JsonResource
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
            'order_id' => $this->order_id,
            'rider_id' => $this->rider_id,
            'rider_first_name' => $this->rider_first_name,
            'rider_last_name' => $this->rider_last_name,
            'rider_phone_number' => $this->rider_phone_number,
            'started_at' => $this->started_at,
            'delivered_at' => $this->delivered_at,
            'cancelled_at' => $this->cancelled_at,
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
            'order' => OrderResource::make($this->whenLoaded('order')),
        ];
    }
}
