<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{
    /** @use HasFactory<\Database\Factories\UserFactory> */
    use HasUuids, HasApiTokens, HasFactory, Notifiable;

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
        'role',
        'profile_picture',
        'date_of_birth',
        'phone_number',
        'street_address',
        'postal_code',
        'city',
        'region',
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

    // --- CUSTOMER ---

    /**
     * Get the user's reviews.
     *
     * @return HasMany
     */
    public function reviews(): HasMany
    {
        return $this->hasMany(RestaurantReview::class);
    }

    /**
     * Get the user's carts.
     *
     * @return HasMany
     */
    public function carts(): HasMany
    {
        return $this->hasMany(Cart::class);
    }

    // --- RESTAURATEUR ---

    /**
     * Get the user's owned restaurants.
     *
     * @return BelongsToMany
     */
    public function ownedRestaurants(): BelongsToMany
    {
        return $this->belongsToMany(Restaurant::class)
            ->wherePivot('role', 'OWNER');
    }

    /**
     * Get the user's co-owned restaurants.
     *
     * @return BelongsToMany
     */
    public function coOwnedRestaurants(): BelongsToMany
    {
        return $this->belongsToMany(Restaurant::class)
            ->wherePivot('role', 'CO-OWNER');
    }

    // --- RIDER --- 

    /**
     * Get the user's rider restaurants.
     *
     * @return BelongsToMany
     */
    public function riderRestaurants(): BelongsToMany
    {
        return $this->belongsToMany(Restaurant::class)
            ->wherePivot('role', 'RIDER')
            ->withPivot('contract_start', 'contract_end', 'is_active');
    }
}
