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
        $resumePath = null;

        try {
            $resumePath = $data['resume']->store('job-applications', 'local');

            return $rider->jobApplications()->create([
                ...$data,
                'resume' => $resumePath,
                'job_post_id' => $jobPost->id,
                'declaration_accepted_at' => now(),
            ])->refresh();
        } catch (Throwable $e) {
            if ($resumePath !== null) {
                $this->fileService->delete($resumePath);
            }

            throw $e;
        }
    }
}
