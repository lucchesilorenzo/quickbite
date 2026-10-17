<?php

declare(strict_types=1);

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

#[Fillable([
    'restaurant_id',
    'discount_rate',
    'min_discount_amount',
])]
class Offer extends Model
{
    use HasFactory;
    use HasUuids;

    /**
     * Get the restaurant that owns the offer.
     *
     * @return BelongsTo<Restaurant, $this>
     */
    public function restaurant(): BelongsTo
    {
        return $this->belongsTo(Restaurant::class);
    }

    protected function casts(): array
    {
        return [
            'discount_rate' => 'float',
            'min_discount_amount' => 'float',
        ];
    }
}
