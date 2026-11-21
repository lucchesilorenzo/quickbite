<?php

declare(strict_types=1);

namespace App\Models;

use App\Enums\NotificationPreference as NotificationPreferenceType;
use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

#[Fillable([
    'user_id',
    'type',
    'enabled',
])]
class NotificationPreference extends Model
{
    use HasFactory;
    use HasUuids;

    /**
     * Get the user that owns the notification preference.
     *
     * @return BelongsTo<User, $this>
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'type' => NotificationPreferenceType::class,
            'enabled' => 'boolean',
        ];
    }
}
