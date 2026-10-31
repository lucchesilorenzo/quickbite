<?php

declare(strict_types=1);

namespace App\Models;

use App\Enums\DeliveryDay as DeliveryDayType;
use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

#[Fillable([
    'restaurant_id',
    'day',
    'start_time',
    'end_time',
    'order',
])]
class DeliveryDay extends Model
{
    use HasFactory;
    use HasUuids;

    /**
     * Get the restaurant that owns the delivery day.
     *
     * @return BelongsTo<Restaurant, $this>
     */
    public function restaurant(): BelongsTo
    {
        return $this->belongsTo(Restaurant::class);
    }

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'day' => DeliveryDayType::class,
        ];
    }
}
