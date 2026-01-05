<?php

declare(strict_types=1);

namespace App\Policies;

use App\Models\JobApplication;
use App\Models\JobPost;
use App\Models\User;
use Illuminate\Auth\Access\Response;

class JobApplicationPolicy
{
    public function create(User $rider, JobPost $jobPost): Response
    {
        return JobApplication::query()
            ->where('job_post_id', $jobPost->id)
            ->where('rider_id', $rider->id)
            ->doesntExist()
            ? Response::allow()
            : Response::deny('You have already applied for this job.');
    }
}
