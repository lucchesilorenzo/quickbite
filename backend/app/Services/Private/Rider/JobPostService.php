<?php

declare(strict_types=1);

namespace App\Services\Private\Rider;

use App\Models\JobPost;
use Illuminate\Contracts\Pagination\CursorPaginator;

class JobPostService
{
    private const int PER_PAGE = 10;

    public function getJobPosts(array $data): CursorPaginator
    {
        $minSalary = config('job_posts.salary.min');
        $maxSalary = config('job_posts.salary.max');
        $hasSalaryFilter = isset($data['min_salary']) || isset($data['max_salary']);

        $search = $data['search'] ?? null;
        $minSalary = isset($data['min_salary']) ? (int) $data['min_salary'] : $minSalary;
        $maxSalary = isset($data['max_salary']) ? (int) $data['max_salary'] : $maxSalary;
        $employmentType = $data['employment_type'] ?? null;
        $sortBy = $data['sort_by'] ?? null;

        return JobPost::query()
            ->with(['restaurant'])
            ->when($search, fn ($query) => $query->whereLike('title', "%{$search}%"))
            ->when($hasSalaryFilter, function ($query) use ($minSalary, $maxSalary) {
                return $query->whereNotNull('salary')
                    ->whereBetween('salary', [$minSalary, $maxSalary]);
            })
            ->when($employmentType, fn ($query) => $query->where('employment_type', $employmentType))
            ->when($sortBy, fn ($query) => $query->orderBy('created_at', $sortBy))
            ->where('status', 'open')
            ->cursorPaginate(self::PER_PAGE);
    }

    public function getJobPost(JobPost $jobPost): JobPost
    {
        return $jobPost->load(['restaurant']);
    }
}
