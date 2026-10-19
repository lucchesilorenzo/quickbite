<?php

declare(strict_types=1);

namespace App\Http\Resources\Api\V1;

use App\Http\Resources\Api\V1\Restaurant\RestaurantResource;
use App\Models\Order;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

/**
 * @mixin Order
 */
class OrderResource extends JsonResource
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
            'user_id' => $this->user_id,
            'restaurant_id' => $this->restaurant_id,
            'order_code' => $this->order_code,
            'first_name' => $this->first_name,
            'last_name' => $this->last_name,
            'phone_number' => $this->phone_number,
            'street_address' => $this->street_address,
            'building_number' => $this->building_number,
            'postcode' => $this->postcode,
            'city' => $this->city,
            'state' => $this->state,
            'country' => $this->country,
            'delivery_time' => $this->delivery_time,
            'notes' => $this->notes,
            'payment_method' => $this->payment_method,
            'payment_method_type' => $this->payment_method_type,
            'payment_intent_id' => $this->payment_intent_id,
            'payment_status' => $this->payment_status,
            'subtotal' => $this->subtotal,
            'delivery_fee' => $this->delivery_fee,
            'service_fee' => $this->service_fee,
            'discount_rate' => $this->discount_rate,
            'discount' => $this->discount,
            'total' => $this->total,
            'status' => $this->status,
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
            'order_items' => OrderItemResource::collection(
                $this->whenLoaded('orderItems')
            ),
            'restaurant' => RestaurantResource::make(
                $this->whenLoaded('restaurant')
            ),
            'delivery' => DeliveryResource::make(
                $this->whenLoaded('delivery')
            ),
        ];
    }
}
