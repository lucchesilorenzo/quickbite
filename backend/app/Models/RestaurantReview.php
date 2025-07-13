<?php

declare(strict_types=1);

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class RestaurantReview extends Model
{
    use HasFactory, HasUuids;

    protected $fillable = [
        'user_id',
        'restaurant_id',
        'order_id',
        'comment',
        'rating',
    ];

    /**
     * Get the user that owns the review.
     */
    public function customer(): BelongsTo
    {
        return $this->belongsTo(User::class, 'user_id');
    }

    /**
     * Get the restaurant that owns the review.
     */
    public function restaurant(): BelongsTo
    {
        return $this->belongsTo(Restaurant::class);
    }

    /**
     * Get the order that owns the review.
     */
    public function order(): BelongsTo
    {
        return $this->belongsTo(Order::class);
    }
}
