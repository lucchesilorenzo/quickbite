<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Order extends Model
{
    use HasUuids, HasFactory;

    protected $fillable = [
        'user_id',
        'restaurant_id',
        'order_code',
        'first_name',
        'last_name',
        'phone_number',
        'street_address',
        'building_number',
        'postcode',
        'city',
        'country',
        'delivery_time',
        'notes',
        'payment_method',
        'subtotal',
        'delivery_fee',
        'service_fee',
        'discount_rate',
        'discount',
        'total',
    ];

    protected $casts = [
        'subtotal' => 'float',
        'delivery_fee' => 'float',
        'service_fee' => 'float',
        'discount_rate' => 'float',
        'discount' => 'float',
        'total' => 'float',
    ];

    /**
     * Get the customer that owns the order.
     *
     * @return BelongsTo
     */
    public function customer(): BelongsTo
    {
        return $this->belongsTo(User::class, 'user_id');
    }

    /**
     * Get the restaurant that owns the order.
     *
     * @return BelongsTo
     */
    public function restaurant(): BelongsTo
    {
        return $this->belongsTo(Restaurant::class);
    }

    /**
     * Get the order items for the order.
     *
     * @return HasMany
     */
    public function orderItems(): HasMany
    {
        return $this->hasMany(OrderItem::class);
    }
}
