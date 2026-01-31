<?php

declare(strict_types=1);

namespace App\Policies;

use App\Enums\RestaurantRole;
use App\Models\JobApplication;
use App\Models\JobPost;
use App\Models\User;
use App\Traits\HasRestaurantAuthorization;
use Illuminate\Auth\Access\Response;
use Illuminate\Support\Facades\DB;

class JobApplicationPolicy
{
    use HasRestaurantAuthorization;

    public function viewAny(User $partner, JobPost $jobPost): Response
    {
        return $this->isPartner($partner, $jobPost->restaurant)
            ? Response::allow()
            : Response::deny('You are not authorized to view these job applications.');
    }

    public function create(User $rider, JobPost $jobPost): Response
    {
        $alreadyEmployed = DB::table('restaurant_user')
            ->where('user_id', $rider->id)
            ->where('role', RestaurantRole::RIDER->value)
            ->where('is_active', true)
            ->exists();

        if ($alreadyEmployed) {
            return Response::deny('You are already employed as a rider.');
        }

        $alreadyApplied = JobApplication::query()
            ->where('job_post_id', $jobPost->id)
            ->where('rider_id', $rider->id)
            ->exists();

        if ($alreadyApplied) {
            return Response::deny('You have already applied for this job.');
        }

        return Response::allow();
    }

    public function downloadResume(User $partner, JobApplication $jobApplication): Response
    {
        return $this->isPartner($partner, $jobApplication->jobPost->restaurant)
            ? Response::allow()
            : Response::deny('You are not authorized to download this resume.');
    }

    public function update(User $partner, JobApplication $jobApplication): Response
    {
        return $this->isPartner($partner, $jobApplication->jobPost->restaurant)
            ? Response::allow()
            : Response::deny('You are not authorized to update this job application.');
    }
}
