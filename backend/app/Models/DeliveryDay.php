<?php

declare(strict_types=1);

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class DeliveryDay extends Model
{
    use HasFactory, HasUuids;

    protected $fillable = [
        'restaurant_id',
        'day',
        'start_time',
        'end_time',
        'order',
    ];

    /**
     * Get the restaurant that owns the delivery day.
     *
     * @return BelongsTo<Restaurant, $this>
     */
    public function restaurant(): BelongsTo
    {
        return $this->belongsTo(Restaurant::class);
    }
}
