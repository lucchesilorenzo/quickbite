<?php

declare(strict_types=1);

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;

use App\Enums\RestaurantRolesEnum;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;
use Spatie\Permission\Traits\HasRoles;

class User extends Authenticatable
{
    /** @use HasFactory<\Database\Factories\UserFactory> */
    use HasApiTokens, HasFactory, HasRoles, HasUuids, Notifiable;

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
        'country',
        'driving_licence',
        'is_approved',
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
     * Get the user's restaurants.
     */
    public function restaurants(): BelongsToMany
    {
        return $this->belongsToMany(Restaurant::class)
            ->withPivot(['role', 'contract_start', 'contract_end', 'is_active']);
    }

    // --- CUSTOMER ---

    /**
     * Get the user's reviews.
     */
    public function reviews(): HasMany
    {
        return $this->hasMany(RestaurantReview::class);
    }

    /**
     * Get the user's carts.
     */
    public function carts(): HasMany
    {
        return $this->hasMany(Cart::class);
    }

    /**
     * Get the user's orders.
     */
    public function orders(): HasMany
    {
        return $this->hasMany(Order::class);
    }

    // --- PARTNERS ---

    /**
     * Get the user's owned restaurants.
     */
    public function ownedRestaurants(): BelongsToMany
    {
        return $this->belongsToMany(Restaurant::class)
            ->wherePivot('role', RestaurantRolesEnum::OWNER);
    }

    /**
     * Get the user's co-owned restaurants.
     */
    public function coOwnedRestaurants(): BelongsToMany
    {
        return $this->belongsToMany(Restaurant::class)
            ->wherePivot('role', RestaurantRolesEnum::CO_OWNER);
    }

    // --- RIDER ---

    /**
     * Get the user's rider restaurants.
     */
    public function riderRestaurants(): BelongsToMany
    {
        return $this->belongsToMany(Restaurant::class)
            ->wherePivot('role', RestaurantRolesEnum::RIDER)
            ->withPivot('contract_start', 'contract_end', 'is_active');
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
}
