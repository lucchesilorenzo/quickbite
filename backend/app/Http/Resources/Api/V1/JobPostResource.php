<?php

declare(strict_types=1);

namespace App\Http\Resources\Api\V1;

use App\Http\Resources\Api\V1\Restaurant\RestaurantResource;
use App\Models\JobPost;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

/**
 * @mixin JobPost
 */
class JobPostResource extends JsonResource
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
            'title' => $this->title,
            'description_html' => $this->description_html,
            'description_text' => $this->description_text,
            'employment_type' => $this->employment_type,
            'vehicle_type' => $this->vehicle_type,
            'salary' => $this->salary,
            'status' => $this->status,
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
            'already_applied' => $this->when(
                isset($this->already_applied),
                fn (): bool => (bool) $this->already_applied
            ),
            'restaurant' => RestaurantResource::make($this->whenLoaded('restaurant')),
        ];
    }
}
