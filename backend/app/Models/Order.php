<?php

declare(strict_types=1);

namespace App\Models;

use App\Enums\PaymentMethod;
use App\Enums\PaymentStatus;
use Illuminate\Database\Eloquent\Attributes\Scope;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;

class Order extends Model
{
    use HasFactory, HasUuids;

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
        'state',
        'country',
        'delivery_time',
        'notes',
        'payment_method',
        'payment_method_type',
        'payment_intent_id',
        'payment_status',
        'subtotal',
        'delivery_fee',
        'service_fee',
        'discount_rate',
        'discount',
        'total',
        'status',
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
     * Check if the order is expired.
     */
    public function isExpired(): bool
    {
        return $this->payment_status === PaymentStatus::EXPIRED->value;
    }

    /**
     * Get the customer that owns the order.
     *
     * @return BelongsTo<User, $this>
     */
    public function customer(): BelongsTo
    {
        return $this->belongsTo(User::class, 'user_id');
    }

    /**
     * Get the restaurant that owns the order.
     *
     * @return BelongsTo<Restaurant, $this>
     */
    public function restaurant(): BelongsTo
    {
        return $this->belongsTo(Restaurant::class);
    }

    /**
     * Get the order items for the order.
     *
     * @return HasMany<OrderItem, $this>
     */
    public function orderItems(): HasMany
    {
        return $this->hasMany(OrderItem::class);
    }

    /**
     * Get the delivery for the order.
     *
     * @return HasOne<Delivery, $this>
     */
    public function delivery(): HasOne
    {
        return $this->hasOne(Delivery::class);
    }
}
