<?php

declare(strict_types=1);

namespace App\Models;

use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Support\Facades\Storage;

/**
 * @property-read string|null $image_url
 */
class Category extends Model
{
    /** @use HasFactory<\Database\Factories\CategoryFactory> */
    use HasFactory, HasUuids;

    protected $fillable = [
        'name',
        'slug',
        'image',
        'is_default',
    ];

    protected $appends = [
        'image_url',
    ];

    /**
     * Get the restaurants for the category.
     *
     * @return BelongsToMany<Restaurant, $this>
     */
    public function restaurants(): BelongsToMany
    {
        return $this->belongsToMany(Restaurant::class);
    }

    /**
     * Get the image URL attribute.
     */
    protected function imageUrl(): Attribute
    {
        return Attribute::make(
            get: fn (): ?string => $this->image
                ? Storage::disk('public')->url($this->image)
                : null,
        );
    }
}
