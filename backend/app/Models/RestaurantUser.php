<?php

declare(strict_types=1);

namespace App\Models;

use App\Enums\RestaurantRole;
use Illuminate\Database\Eloquent\Attributes\Table;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\Pivot;

#[Table(name: 'restaurant_user')]
class RestaurantUser extends Pivot
{
    use HasFactory;

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'role' => RestaurantRole::class,
            'is_active' => 'boolean',
        ];
    }
}
