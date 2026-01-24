<?php

declare(strict_types=1);

namespace App\Services\Private\Partner;

use App\Enums\JobApplicationStatus;
use App\Enums\JobPostStatus;
use App\Enums\RestaurantRole;
use App\Exceptions\Private\Partner\AlreadyEmployedException;
use App\Models\JobApplication;
use App\Models\JobPost;
use Illuminate\Pagination\LengthAwarePaginator;
use Illuminate\Support\Facades\DB;

class JobApplicationService
{
    public function getJobApplications(array $data, JobPost $jobPost): LengthAwarePaginator
    {
        $filter = isset($data['filter']) ? json_decode($data['filter'], true) : null;
        $sortBy = isset($data['sort_by']) ? json_decode($data['sort_by'], true) : null;
        $search = $data['search'] ?? null;

        $query = $jobPost->jobApplications();

        // Filtering
        if ($filter && isset($filter['field'], $filter['operator'], $filter['value'])) {
            $field = $filter['field'];
            $operator = $filter['operator'];
            $value = $filter['value'];

            $query = match ($operator) {
                'contains' => $query->whereLike($field, "%{$value}%"),
                'doesNotContain' => $query->whereNotLike($field, "%{$value}%"),
                'equals' => $query->where($field, $value),
                'doesNotEqual' => $query->whereNot($field, $value),
                'startsWith' => $query->whereLike($field, "{$value}%"),
                'endsWith' => $query->whereLike($field, "%{$value}"),
                'doesNotStartWith' => $query->whereNotLike($field, "{$value}%"),
                'doesNotEndWith' => $query->whereNotLike($field, "%{$value}"),
                'isEmpty' => $query->where(function ($q) use ($field): void {
                    $q->whereNull($field)
                        ->orWhere($field, '');
                }),
                'isNotEmpty' => $query->where(function ($q) use ($field): void {
                    $q->whereNotNull($field)
                        ->whereNot($field, '');
                }),
                'isAnyOf' => $query->whereIn($field, is_array($value) ? $value : [$value]),
                default => $query,
            };
        }

        // Search
        if ($search) {
            $query->whereLike('title', "%{$search}%");
        }

        // Sorting
        if ($sortBy && isset($sortBy['field'], $sortBy['sort'])) {
            $query->orderBy($sortBy['field'], $sortBy['sort']);
        } else {
            $query->oldest('created_at');
        }

        return $query->paginate($data['page_size']);
    }

    public function updateJobApplicationStatus(array $data, JobApplication $jobApplication): JobApplication
    {
        DB::transaction(function () use ($data, $jobApplication): void {
            $alreadyEmployed = DB::table('restaurant_user')
                ->where('user_id', $jobApplication->rider_id)
                ->where('role', RestaurantRole::RIDER->value)
                ->where('is_active', true)
                ->exists();

            if ($alreadyEmployed) {
                throw new AlreadyEmployedException;
            }

            JobApplication::query()
                ->where('job_post_id', $jobApplication->job_post_id)
                ->whereNot('id', $jobApplication->id)
                ->update([
                    'status' => JobApplicationStatus::REJECTED->value,
                ]);

            $jobApplication->jobPost->update([
                'status' => JobPostStatus::CLOSED->value,
            ]);

            $jobApplication->update($data);

            $jobApplication->rider->restaurants()
                ->attach($jobApplication->jobPost->restaurant->id, [
                    'role' => RestaurantRole::RIDER->value,
                    'is_active' => true,
                ]);
        });

        return $jobApplication->refresh();
    }
}
