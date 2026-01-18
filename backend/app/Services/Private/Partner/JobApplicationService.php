<?php

declare(strict_types=1);

namespace App\Services\Private\Partner;

use App\Models\JobApplication;
use App\Models\JobPost;
use Illuminate\Pagination\LengthAwarePaginator;

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
        $jobApplication->update($data);

        return $jobApplication->refresh();
    }
}
