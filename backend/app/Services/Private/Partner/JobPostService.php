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
        return $restaurant->jobPosts()
            ->withCount('jobApplications')
            ->paginate($data['page_size']);
    }

    public function createJobPost(array $data, Restaurant $restaurant): JobPost
    {
        return $restaurant->jobPosts()->create($data);
    }
}
