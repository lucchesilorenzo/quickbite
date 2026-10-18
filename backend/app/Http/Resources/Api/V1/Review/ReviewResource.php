<?php

declare(strict_types=1);

namespace App\Http\Resources\Api\V1\Review;

use App\Http\Resources\Api\V1\OrderResource;
use App\Http\Resources\Api\V1\UserResource;
use App\Models\Review;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

/**
 * @mixin Review
 */
class ReviewResource extends JsonResource
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
            'order_id' => $this->order_id,
            'comment' => $this->comment,
            'rating' => $this->rating,
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
            'customer' => UserResource::make($this->whenLoaded('customer')),
            'order' => OrderResource::make($this->whenLoaded('order')),
        ];
    }
}
