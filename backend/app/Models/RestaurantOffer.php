<?php

declare(strict_types=1);

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class RestaurantOffer extends Model
{
    /** @use HasFactory<\Database\Factories\RestaurantOfferFactory> */
    use HasFactory, HasUuids;

    protected $fillable = [
        'restaurant_id',
        'discount_rate',
        'min_discount_amount',
    ];

    protected $casts = [
        'discount_rate' => 'float',
        'min_discount_amount' => 'float',
    ];

    /**
     * Get the restaurant that owns the offer.
     */
    public function restaurant(): BelongsTo
    {
        return $this->belongsTo(Restaurant::class);
    }
}
