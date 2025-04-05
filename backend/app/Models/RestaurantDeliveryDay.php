<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class RestaurantDeliveryDay extends Model
{
    use HasUuids, HasFactory;

    protected $fillable = [
        'restaurant_id',
        'day',
        'start_time',
        'end_time',
    ];

    /**
     * Get the restaurant that owns the delivery day.
     *
     * @return BelongsTo
     */
    public function restaurant(): BelongsTo
    {
        return $this->belongsTo(Restaurant::class);
    }
}
