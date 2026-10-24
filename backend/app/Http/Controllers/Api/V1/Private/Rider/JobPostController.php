<?php

declare(strict_types=1);

namespace App\Http\Controllers\Api\V1\Private\Rider;

use App\Http\Controllers\Controller;
use App\Http\Requests\Api\V1\Private\Rider\JobPost\GetJobPostsRequest;
use App\Http\Resources\Api\V1\JobPostResource;
use App\Models\JobPost;
use App\Services\Private\Rider\JobPostService;
use Dedoc\Scramble\Attributes\Endpoint;
use Dedoc\Scramble\Attributes\Group;
use Dedoc\Scramble\Attributes\Response;
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
    #[Endpoint(
        operationId: 'getRiderJobPosts',
        title: 'List job posts',
        description: 'List available job posts for riders.',
        method: 'GET'
    )]
    #[Response(
        status: 200,
        description: 'Job posts retrieved successfully.',
    )]
    #[Response(
        status: 500,
        description: 'An unexpected error occurred while retrieving job posts.',
    )]
    public function getJobPosts(GetJobPostsRequest $request): JsonResponse
    {
        try {
            $jobPosts = $this->jobPostService->getJobPosts(
                auth()->user(),
                $request->validated(),
            );

            return JobPostResource::collection($jobPosts)
                ->additional([
                    'success' => true,
                    'message' => 'Job posts retrieved successfully.',
                ])
                ->response();
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
    #[Endpoint(
        operationId: 'getRiderJobPost',
        title: 'Get job post',
        description: 'Get a single job post.',
        method: 'GET'
    )]
    #[Response(
        status: 200,
        description: 'Job post retrieved successfully.',
    )]
    #[Response(
        status: 500,
        description: 'An unexpected error occurred while retrieving job post.',
    )]
    public function getJobPost(JobPost $jobPost): JsonResponse
    {
        try {
            $jobPost = $this->jobPostService->getJobPost(
                auth()->user(),
                $jobPost
            );

            return JobPostResource::make($jobPost)
                ->additional([
                    'success' => true,
                    'message' => 'Job post retrieved successfully.',
                ])
                ->response();
        } catch (Throwable) {
            return response()->json([
                'success' => false,
                'message' => 'Could not get job post.',
            ], 500);
        }
    }
}
