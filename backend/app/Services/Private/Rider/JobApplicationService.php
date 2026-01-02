<?php

declare(strict_types=1);

namespace App\Services\Private\Rider;

use App\Models\JobApplication;
use App\Models\JobPost;
use App\Models\User;
use App\Services\Shared\FileService;
use Throwable;

class JobApplicationService
{
    public function __construct(
        private readonly FileService $fileService
    ) {}

    public function createJobApplication(
        User $rider,
        array $data,
        JobPost $jobPost
    ): JobApplication {
        try {
            $data['resume'] = $this->fileService->create(
                $data['resume'],
                'job-applications'
            );

            return $rider->jobApplications()->create([
                ...$data,
                'job_post_id' => $jobPost->id,
                'declaration_accepted_at' => now(),
            ])->refresh();
        } catch (Throwable $e) {
            $this->fileService->delete($data['resume']);

            throw $e;
        }
    }
}
