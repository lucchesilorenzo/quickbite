<?php

declare(strict_types=1);

namespace App\Policies;

use App\Models\JobPost;
use App\Models\Restaurant;
use App\Models\User;
use App\Traits\HasRestaurantAuthorization;
use Illuminate\Auth\Access\Response;

class JobPostPolicy
{
    use HasRestaurantAuthorization;

    // === PARTNER ===

    public function viewAny(User $user, Restaurant $restaurant): Response
    {
        return $this->isPartner($user, $restaurant)
          ? Response::allow()
          : Response::deny('You are not authorized to view job posts for this restaurant.');
    }

    public function view(User $user, JobPost $jobPost): Response
    {
        return $this->isPartner($user, $jobPost->restaurant)
          ? Response::allow()
          : Response::deny('You are not authorized to view this job post.');
    }

    public function create(User $user, Restaurant $restaurant): Response
    {
        return $this->isPartner($user, $restaurant)
          ? Response::allow()
          : Response::deny('You are not authorized to create this job post.');
    }

    public function update(User $user, JobPost $jobPost): Response
    {
        return $this->isPartner($user, $jobPost->restaurant)
          ? Response::allow()
          : Response::deny('You are not authorized to update this job post.');
    }

    public function deleteAny(User $user, Restaurant $restaurant): Response
    {
        return $this->isPartner($user, $restaurant)
          ? Response::allow()
          : Response::deny('You are not authorized to delete job posts for this restaurant.');
    }

    public function delete(User $user, JobPost $jobPost): Response
    {
        return $this->isPartner($user, $jobPost->restaurant)
          ? Response::allow()
          : Response::deny('You are not authorized to delete this job post.');
    }
}
