<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Restaurant extends Model
{
    /** @use HasFactory<\Database\Factories\RestaurantFactory> */
    use HasUuids, HasFactory;

    protected $fillable = [
        'name',
        'slug',
        'description',
        'street_address',
        'postal_code',
        'city',
        'region',
        'country',
        'phone_number',
        'email',
        'vat_id',
        'rating',
        'min_amount',
        'shipping_cost',
        'is_approved',
        'restaurant_image',
        'discount',
    ];

    /**
     * Get the restaurant's restaurateurs (owners and co-owners).
     *
     * @return BelongsToMany
     */
    public function restaurateurs(): BelongsToMany
    {
        return $this->belongsToMany(User::class)
            ->withPivot('role')
            ->wherePivotIn('role', ['OWNER', 'CO-OWNER']);
    }

    /**
     * Get the restaurant's riders.
     *
     * @return BelongsToMany
     */
    public function riders(): BelongsToMany
    {
        return $this->belongsToMany(User::class)
            ->withPivot('role', 'contract_start', 'contract_end', 'is_active')
            ->wherePivot('role', 'RIDER');
    }

    /**
     * Get the restaurant's delivery days.
     *
     * @return HasMany
     */
    public function deliveryDays(): HasMany
    {
        return $this->hasMany(RestaurantDeliveryDay::class);
    }

    /**
     * Get the restaurant's categories.
     *
     * @return BelongsToMany
     */
    public function categories(): BelongsToMany
    {
        return $this->belongsToMany(Category::class);
    }
}
