<?php

declare(strict_types=1);

namespace App\Http\Resources\Api\V1\Restaurant;

use App\Http\Resources\Api\V1\Category\CategoryResource;
use App\Http\Resources\Api\V1\DeliveryDayResource;
use App\Http\Resources\Api\V1\MenuCategory\MenuCategoryResource;
use App\Http\Resources\Api\V1\Offer\OfferResource;
use App\Http\Resources\Api\V1\Review\ReviewResource;
use App\Models\Restaurant;
use App\Models\RestaurantUser;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

/**
 * @mixin Restaurant
 *
 * @property-read RestaurantUser $pivot
 * @property-read float|null $reviews_avg_rating
 * @property-read float $distance
 */
class RestaurantResource extends JsonResource
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
            'name' => $this->name,
            'slug' => $this->slug,
            'description' => $this->description,
            'street_address' => $this->street_address,
            'building_number' => $this->building_number,
            'postcode' => $this->postcode,
            'city' => $this->city,
            'state' => $this->state,
            'country' => $this->country,
            'latitude' => $this->latitude,
            'longitude' => $this->longitude,
            'phone_number' => $this->phone_number,
            'email' => $this->email,
            'min_amount' => $this->min_amount,
            'delivery_fee' => $this->delivery_fee,
            'service_fee' => $this->service_fee,
            'min_delivery_time' => $this->min_delivery_time,
            'max_delivery_time' => $this->max_delivery_time,
            'logo' => $this->logo,
            'cover' => $this->cover,
            'is_approved' => $this->is_approved,
            'force_close' => $this->force_close,
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
            'full_address' => $this->full_address,
            'is_open' => $this->is_open,
            'logo_url' => $this->logo_url,
            'cover_url' => $this->cover_url,
            'reviews_avg_rating' => $this->whenHas('reviews_avg_rating', fn (): ?float => $this->reviews_avg_rating),
            'reviews_count' => $this->whenCounted('reviews'),
            'distance' => $this->whenHas('distance', fn (): float => (float) $this->distance),
            'categories' => CategoryResource::collection($this->whenLoaded('categories')),
            'delivery_days' => DeliveryDayResource::collection($this->whenLoaded('deliveryDays')),
            'offers' => OfferResource::collection($this->whenLoaded('offers')),
            'reviews' => ReviewResource::collection($this->whenLoaded('reviews')),
            'menu_categories' => MenuCategoryResource::collection($this->whenLoaded('menuCategories')),
            'pivot' => $this->whenPivotLoaded('restaurant_user', fn (): array => [
                'user_id' => (string) $this->pivot->user_id,
                'restaurant_id' => (string) $this->pivot->restaurant_id,
                'role' => $this->pivot->role,
                'is_active' => (bool) $this->pivot->is_active,
            ]),
        ];
    }
}
