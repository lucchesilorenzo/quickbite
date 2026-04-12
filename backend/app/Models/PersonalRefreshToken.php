<?php

declare(strict_types=1);

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class PersonalRefreshToken extends Model
{
    use HasFactory, HasUuids;

    protected $fillable = [
        'user_id',
        'token',
        'last_used_at',
        'expires_at',
    ];

    /**
     * Get the user that owns the token.
     *
     * @return BelongsTo<User, $this>
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
}
