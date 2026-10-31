<?php

declare(strict_types=1);

namespace App\Models;

use App\Enums\EmploymentType;
use App\Enums\JobPostStatus;
use App\Enums\VehicleType;
use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

/**
 * @property bool $already_applied
 */
#[Fillable([
    'restaurant_id',
    'title',
    'description_html',
    'description_text',
    'employment_type',
    'vehicle_type',
    'salary',
    'status',
])]
class JobPost extends Model
{
    use HasFactory;
    use HasUuids;

    /**
     * Get the restaurant that owns the job post.
     *
     * @return BelongsTo<Restaurant, $this>
     */
    public function restaurant(): BelongsTo
    {
        return $this->belongsTo(Restaurant::class);
    }

    /**
     * Get the job applications for the job post.
     *
     * @return HasMany<JobApplication, $this>
     */
    public function jobApplications(): HasMany
    {
        return $this->hasMany(JobApplication::class);
    }

    protected function casts(): array
    {
        return [
            'employment_type' => EmploymentType::class,
            'vehicle_type' => VehicleType::class,
            'status' => JobPostStatus::class,
            'salary' => 'float',
        ];
    }
}
