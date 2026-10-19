<?php

declare(strict_types=1);

namespace App\Http\Resources\Api\V1;

use App\Models\User;
use Illuminate\Database\Eloquent\Relations\Pivot;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

/**
 * @mixin User
 *
 * @property-read Pivot $pivot
 */
class UserResource extends JsonResource
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
            'first_name' => $this->first_name,
            'last_name' => $this->last_name,
            'email' => $this->email,
            'email_verified_at' => $this->email_verified_at,
            'profile_picture' => $this->profile_picture,
            'date_of_birth' => $this->date_of_birth,
            'phone_number' => $this->phone_number,
            'street_address' => $this->street_address,
            'building_number' => $this->building_number,
            'postcode' => $this->postcode,
            'city' => $this->city,
            'state' => $this->state,
            'country' => $this->country,
            'vehicle_type' => $this->vehicle_type,
            'drivers_license' => $this->drivers_license,
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
            'stripe_id' => $this->stripe_id,
            'pm_type' => $this->pm_type,
            'pm_last_four' => $this->pm_last_four,
            'trial_ends_at' => $this->trial_ends_at,
            'has_password' => $this->has_password,
            'notification_preferences' => NotificationPreferenceResource::collection(
                $this->whenLoaded('notificationPreferences')
            ),
            'roles' => RoleResource::collection($this->whenLoaded('roles')),
            'pivot' => $this->whenPivotLoaded('restaurant_user', fn (): array => [
                'user_id' => $this->pivot->getAttribute('user_id'),
                'restaurant_id' => $this->pivot->getAttribute('restaurant_id'),
                'role' => $this->pivot->getAttribute('role'),
                'is_active' => $this->pivot->getAttribute('is_active'),
            ]),
        ];
    }
}
