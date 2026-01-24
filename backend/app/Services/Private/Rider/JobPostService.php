<?php

declare(strict_types=1);

namespace App\Services\Private\Rider;

use App\Enums\JobPostStatus;
use App\Models\JobPost;
use App\Models\User;
use Illuminate\Contracts\Pagination\CursorPaginator;

class JobPostService
{
    private const int PER_PAGE = 10;

    public function getJobPosts(User $rider, array $data): CursorPaginator
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
            ->withExists(['jobApplications as already_applied' => fn ($query) => $query->where('rider_id', $rider->id)])
            ->when($search, fn ($query) => $query->whereLike('title', "%{$search}%"))
            ->when($hasSalaryFilter, fn ($query) => $query->whereNotNull('salary')
                ->whereBetween('salary', [$minSalary, $maxSalary]))
            ->when($employmentType, fn ($query) => $query->where('employment_type', $employmentType))
            ->when($sortBy, fn ($query) => $query->orderBy('created_at', $sortBy))
            ->where('status', JobPostStatus::OPEN->value)
            ->cursorPaginate(self::PER_PAGE);
    }

    public function getJobPost(User $rider, JobPost $jobPost): JobPost
    {
        $jobPost->already_applied = $jobPost->jobApplications()
            ->where('rider_id', $rider->id)
            ->exists();

        return $jobPost->load(['restaurant']);
    }
}
