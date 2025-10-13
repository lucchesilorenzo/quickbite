<?php

declare(strict_types=1);

namespace App\Models;

use App\Enums\RestaurantRole;
use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;

/**
 * @property-read string $full_address
 * @property-read bool $is_open
 */
class Restaurant extends Model
{
    /** @use HasFactory<\Database\Factories\RestaurantFactory> */
    use HasFactory, HasUuids;

    protected $fillable = [
        'name',
        'slug',
        'description',
        'street_address',
        'building_number',
        'postcode',
        'city',
        'state',
        'country',
        'latitude',
        'longitude',
        'phone_number',
        'email',
        'min_amount',
        'delivery_fee',
        'service_fee',
        'min_delivery_time',
        'max_delivery_time',
        'logo',
        'cover',
        'is_approved',
        'force_close',
    ];

    protected $casts = [
        'min_amount' => 'float',
        'delivery_fee' => 'float',
        'service_fee' => 'float',
        'reviews_avg_rating' => 'float',
    ];

    protected $appends = [
        'full_address',
        'is_open',
    ];

    /**
     * Check if the restaurant is open.
     */
    public function calculateIsOpen(): bool
    {
        $dayName = mb_strtoupper(now()->format('l'));
        $currentTime = now()->format('H:i');

        return $this->deliveryDays()
            ->where('day', $dayName)
            ->whereNotNull('start_time')
            ->whereNotNull('end_time')
            ->where('start_time', '<=', $currentTime)
            ->where('end_time', '>=', $currentTime)
            ->exists();
    }

    /**
     * Get the restaurant's partners (owners and co-owners).
     *
     * @return BelongsToMany<User, $this>
     */
    public function partners(): BelongsToMany
    {
        return $this->belongsToMany(User::class)
            ->withPivot('role')
            ->wherePivotIn('role', [RestaurantRole::OWNER, RestaurantRole::CO_OWNER]);
    }

    /**
     * Get the restaurant's riders.
     *
     * @return BelongsToMany<User, $this>
     */
    public function riders(): BelongsToMany
    {
        return $this->belongsToMany(User::class)
            ->withPivot('role', 'contract_start', 'contract_end', 'is_active')
            ->wherePivot('role', RestaurantRole::RIDER);
    }

    /**
     * Get the restaurant's categories.
     *
     * @return BelongsToMany<Category, $this>
     */
    public function categories(): BelongsToMany
    {
        return $this->belongsToMany(Category::class);
    }

    /**
     * Get the restaurant's delivery days.
     *
     * @return HasMany<DeliveryDay, $this>
     */
    public function deliveryDays(): HasMany
    {
        return $this->hasMany(DeliveryDay::class);
    }

    /**
     * Get the restaurant's offers.
     *
     * @return HasMany<Offer, $this>
     */
    public function offers(): HasMany
    {
        return $this->hasMany(Offer::class);
    }

    /**
     * Get the restaurant's menu categories.
     *
     * @return HasMany<MenuCategory, $this>
     */
    public function menuCategories(): HasMany
    {
        return $this->hasMany(MenuCategory::class);
    }

    /**
     * Get the restaurant's reviews.
     *
     * @return HasMany<Review, $this>
     */
    public function reviews(): HasMany
    {
        return $this->hasMany(Review::class);
    }

    /**
     * Get the restaurant's carts.
     *
     * @return HasMany<Cart, $this>
     */
    public function carts(): HasMany
    {
        return $this->hasMany(Cart::class);
    }

    /**
     * Get the restaurant's orders.
     *
     * @return HasMany<Order, $this>
     */
    public function orders(): HasMany
    {
        return $this->hasMany(Order::class);
    }

    /**
     * Get the full address attribute.
     */
    protected function fullAddress(): Attribute
    {
        return Attribute::make(
            get: fn (): string => "{$this->street_address} {$this->building_number}, {$this->postcode} {$this->city}, {$this->state}"
        );
    }

    /**
     * Get the is_open attribute.
     */
    protected function isOpen(): Attribute
    {
        return Attribute::make(
            get: fn (): bool => $this->force_close
                ? false
                : $this->calculateIsOpen()
        );
    }
}
