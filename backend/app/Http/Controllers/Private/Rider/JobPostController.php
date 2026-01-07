<?php

declare(strict_types=1);

namespace App\Http\Controllers\Private\Rider;

use App\Http\Controllers\Controller;
use App\Http\Requests\Private\Rider\JobPost\GetJobPostsRequest;
use App\Models\JobPost;
use App\Services\Private\Rider\JobPostService;
use Dedoc\Scramble\Attributes\Group;
use Illuminate\Http\JsonResponse;
use Throwable;

#[Group('Rider Job Posts')]
class JobPostController extends Controller
{
    public function __construct(
        private readonly JobPostService $jobPostService
    ) {}

    /**
     * Get all job posts.
     */
    public function getJobPosts(GetJobPostsRequest $request): JsonResponse
    {
        try {
            $jobPosts = $this->jobPostService->getJobPosts(
                auth()->user(),
                $request->validated(),
            );

            return response()->json([
                'success' => true,
                'message' => 'Job posts retrieved successfully.',
                'job_posts' => $jobPosts,
            ], 200);
        } catch (Throwable) {
            return response()->json([
                'success' => false,
                'message' => 'Could not get job posts.',
            ], 500);
        }
    }

    /**
     * Get job post.
     */
    public function getJobPost(JobPost $jobPost): JsonResponse
    {
        try {
            $jobPost = $this->jobPostService->getJobPost(
                auth()->user(),
                $jobPost
            );

            return response()->json([
                'success' => true,
                'message' => 'Job post retrieved successfully.',
                'job_post' => $jobPost,
            ], 200);
        } catch (Throwable) {
            return response()->json([
                'success' => false,
                'message' => 'Could not get job post.',
            ], 500);
        }
    }
}
