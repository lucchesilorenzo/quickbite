<?php

declare(strict_types=1);

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Delivery extends Model
{
    use HasFactory, HasUuids;

    protected $fillable = [
        'order_id',
        'rider_id',
        'rider_first_name',
        'rider_last_name',
        'rider_phone_number',
        'delivered_at',
        'cancelled_at',
    ];

    /**
     * Check if rider is busy.
     */
    public static function isRiderBusy(string $riderId): bool
    {
        return self::where('rider_id', $riderId)
            ->whereNull('delivered_at')
            ->exists();
    }

    /**
     * Get the order that owns the delivery.
     */
    public function order(): BelongsTo
    {
        return $this->belongsTo(Order::class);
    }

    /**
     * Get the rider that owns the delivery.
     */
    public function rider(): BelongsTo
    {
        return $this->belongsTo(User::class, 'rider_id');
    }
}
