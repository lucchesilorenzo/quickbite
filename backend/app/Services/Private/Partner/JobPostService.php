<?php

declare(strict_types=1);

namespace App\Services\Private\Partner;

use App\Models\JobPost;
use App\Models\Restaurant;

class JobPostService
{
    public function createJobPost(array $data, Restaurant $restaurant): JobPost
    {
        return $restaurant->jobPosts()->create($data);
    }
}
