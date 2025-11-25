<?php

declare(strict_types=1);

namespace App\Services\Private\Partner;

use App\Models\JobPost;
use App\Models\Restaurant;
use Illuminate\Pagination\LengthAwarePaginator;

class JobPostService
{
    public function getJobPosts(array $data, Restaurant $restaurant): LengthAwarePaginator
    {
        $filter = isset($data['filter']) ? json_decode($data['filter'], true) : null;
        $sortBy = isset($data['sort_by']) ? json_decode($data['sort_by'], true) : null;
        $search = $data['search'] ?? null;

        $query = $restaurant->jobPosts()->withCount('jobApplications');

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
        }

        return $query->paginate($data['page_size']);
    }

    public function getJobPost(JobPost $jobPost): JobPost
    {
        return $jobPost;
    }

    public function createJobPost(array $data, Restaurant $restaurant): JobPost
    {
        return $restaurant->jobPosts()->create($data);
    }

    public function deleteJobPost(JobPost $jobPost): void
    {
        $jobPost->delete();
    }

    public function deleteJobPosts(array $data): void
    {
        JobPost::query()
            ->whereIn('id', $data['ids'])
            ->delete();
    }
}
