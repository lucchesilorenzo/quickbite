<?php

declare(strict_types=1);

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class MenuItem extends Model
{
    use HasFactory, HasUuids;

    protected $fillable = [
        'menu_category_id',
        'name',
        'description',
        'price',
        'image',
        'is_available',
        'order',
    ];

    protected $casts = [
        'price' => 'float',
    ];

    /**
     * Get the menu category that owns the menu item.
     */
    public function menuCategory(): BelongsTo
    {
        return $this->belongsTo(MenuCategory::class);
    }

    /**
     * Get all of the cart items for the menu item.
     */
    public function cartItems(): HasMany
    {
        return $this->hasMany(CartItem::class);
    }

    /**
     * Get all of the order items for the menu item.
     */
    public function orderItems(): HasMany
    {
        return $this->hasMany(OrderItem::class);
    }
}
