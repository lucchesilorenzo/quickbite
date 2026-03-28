<?php

declare(strict_types=1);

namespace App\Models;

use App\Enums\RestaurantRole;
use Illuminate\Auth\Passwords\CanResetPassword;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;
use Spatie\Permission\Traits\HasRoles;

/**
 * @property-read bool $has_password
 */
class User extends Authenticatable implements MustVerifyEmail
{
    /** @use HasFactory<\Database\Factories\UserFactory> */
    use CanResetPassword, HasApiTokens, HasFactory, HasRoles, HasUuids, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'first_name',
        'last_name',
        'email',
        'password',
        'profile_picture',
        'date_of_birth',
        'phone_number',
        'street_address',
        'building_number',
        'postcode',
        'city',
        'state',
        'country',
        'vehicle_type',
        'drivers_license',
        'is_approved',
    ];

    protected $appends = [
        'has_password',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var list<string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * Get the user's social providers.
     *
     * @return HasMany<SocialProvider, $this>
     */
    public function socialProviders(): HasMany
    {
        return $this->hasMany(SocialProvider::class);
    }

    /**
     * Get the user's restaurants.
     *
     * @return BelongsToMany<Restaurant, $this>
     */
    public function restaurants(): BelongsToMany
    {
        return $this->belongsToMany(Restaurant::class)
            ->withPivot('role', 'is_active');
    }

    /**
     * Get the user's notification preferences.
     *
     * @return HasMany<NotificationPreference, $this>
     */
    public function notificationPreferences(): HasMany
    {
        return $this->hasMany(NotificationPreference::class);
    }

    // === CUSTOMER ===

    /**
     * Get the user's reviews.
     *
     * @return HasMany<Review, $this>
     */
    public function reviews(): HasMany
    {
        return $this->hasMany(Review::class);
    }

    /**
     * Get the user's carts.
     *
     * @return HasMany<Cart, $this>
     */
    public function carts(): HasMany
    {
        return $this->hasMany(Cart::class);
    }

    /**
     * Get the user's orders.
     *
     * @return HasMany<Order, $this>
     */
    public function orders(): HasMany
    {
        return $this->hasMany(Order::class);
    }

    // === PARTNERS ===

    /**
     * Get the user's owned restaurants.
     *
     * @return BelongsToMany<Restaurant, $this>
     */
    public function ownedRestaurants(): BelongsToMany
    {
        return $this->belongsToMany(Restaurant::class)
            ->wherePivot('role', RestaurantRole::OWNER);
    }

    /**
     * Get the user's co-owned restaurants.
     *
     * @return BelongsToMany<Restaurant, $this>
     */
    public function coOwnedRestaurants(): BelongsToMany
    {
        return $this->belongsToMany(Restaurant::class)
            ->wherePivot('role', RestaurantRole::CO_OWNER);
    }

    // === RIDER ===

    /**
     * Get the user's rider restaurants.
     *
     * @return BelongsToMany<Restaurant, $this>
     */
    public function riderRestaurants(): BelongsToMany
    {
        return $this->belongsToMany(Restaurant::class)
            ->wherePivot('role', RestaurantRole::RIDER)
            ->withPivot('is_active');
    }

    /**
     * Get the user's job applications.
     *
     * @return HasMany<JobApplication, $this>
     */
    public function jobApplications(): HasMany
    {
        return $this->hasMany(JobApplication::class, 'rider_id');
    }

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
        ];
    }

    /**
     * Get the has_password attribute.
     */
    protected function hasPassword(): Attribute
    {
        return Attribute::make(
            get: fn (): bool => $this->password !== null,
        );
    }
}
