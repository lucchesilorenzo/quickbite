<?php

declare(strict_types=1);

namespace App\Services\Private\Partner;

use App\Exceptions\Private\Partner\JobPostHasApplicationsException;
use App\Models\JobPost;
use App\Models\Restaurant;
use App\Services\Shared\TableQueryService;
use Illuminate\Pagination\LengthAwarePaginator;

class JobPostService
{
    public function __construct(
        private readonly TableQueryService $tableQueryService
    ) {}

    public function getJobPosts(array $data, Restaurant $restaurant): LengthAwarePaginator
    {
        $query = $restaurant->jobPosts()->withCount('jobApplications');

        $query = $this->tableQueryService->apply(
            $data,
            $query,
            searchable: ['title']
        );

        return $query->paginate($data['page_size']);
    }

    public function getJobPost(JobPost $jobPost): JobPost
    {
        $jobPost->unsetRelation('restaurant');

        return $jobPost;
    }

    public function createJobPost(array $data, Restaurant $restaurant): JobPost
    {
        return $restaurant->jobPosts()->create($data);
    }

    public function updateJobPost(array $data, JobPost $jobPost): JobPost
    {
        $jobPost->update($data);

        return $jobPost;
    }

    public function deleteJobPost(JobPost $jobPost): void
    {
        if ($jobPost->jobApplications()->count() > 0) {
            throw new JobPostHasApplicationsException;
        }

        $jobPost->delete();
    }

    public function deleteJobPosts(array $data): void
    {
        $jobPostsWithApplications = JobPost::query()
            ->whereIn('id', $data['ids'])
            ->whereHas('jobApplications')
            ->exists();

        if ($jobPostsWithApplications) {
            throw new JobPostHasApplicationsException(
                'Some job posts cannot be deleted because they have applications.',
                400
            );
        }

        JobPost::query()
            ->whereIn('id', $data['ids'])
            ->delete();
    }
}
