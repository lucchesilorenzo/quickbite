<?php

declare(strict_types=1);

namespace App\Http\Controllers\Api\V1\Private\Partner;

use App\Exceptions\Private\Partner\JobPostHasApplicationsException;
use App\Http\Controllers\Controller;
use App\Http\Requests\Api\V1\Private\Partner\JobPost\CreateJobPostRequest;
use App\Http\Requests\Api\V1\Private\Partner\JobPost\DeleteJobPostsRequest;
use App\Http\Requests\Api\V1\Private\Partner\JobPost\GetJobPostsRequest;
use App\Http\Requests\Api\V1\Private\Partner\JobPost\UpdateJobPostRequest;
use App\Http\Resources\Api\V1\JobPostResource;
use App\Models\JobPost;
use App\Models\Restaurant;
use App\Services\Private\Partner\JobPostService;
use Dedoc\Scramble\Attributes\Endpoint;
use Dedoc\Scramble\Attributes\Group;
use Dedoc\Scramble\Attributes\IgnoreResponse;
use Dedoc\Scramble\Attributes\Response;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Gate;
use Throwable;

#[Group('Partner Job Posts')]
class JobPostController extends Controller
{
    public function __construct(
        private readonly JobPostService $jobPostService
    ) {}

    /**
     * Get all job posts.
     */
    #[Endpoint(
        operationId: 'getPartnerJobPosts',
        title: 'List job posts',
        description: 'List job posts for a restaurant.',
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
    public function getJobPosts(
        GetJobPostsRequest $request,
        Restaurant $restaurant
    ): JsonResponse {
        Gate::authorize('viewAny', [JobPost::class, $restaurant]);

        try {
            $jobPosts = $this->jobPostService->getJobPosts(
                $request->validated(),
                $restaurant
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
     * Get a job post.
     */
    #[Endpoint(
        operationId: 'getPartnerJobPost',
        title: 'Get job post',
        description: 'Get a single job post for a restaurant.',
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
    public function getJobPost(Restaurant $restaurant, JobPost $jobPost): JsonResponse
    {
        Gate::authorize('view', $jobPost);

        try {
            $jobPost = $this->jobPostService->getJobPost($jobPost);

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

    /**
     * Create a job post.
     */
    #[Endpoint(
        operationId: 'createPartnerJobPost',
        title: 'Create job post',
        description: 'Create a new job post for a restaurant.',
        method: 'POST'
    )]
    #[IgnoreResponse(200)]
    #[Response(
        status: 201,
        description: 'Job post created successfully.',
    )]
    #[Response(
        status: 500,
        description: 'An unexpected error occurred while creating job post.',
    )]
    public function createJobPost(
        CreateJobPostRequest $request,
        Restaurant $restaurant
    ): JsonResponse {
        Gate::authorize('create', [JobPost::class, $restaurant]);

        try {
            $jobPost = $this->jobPostService->createJobPost(
                $request->validated(),
                $restaurant,
            );

            return JobPostResource::make($jobPost)
                ->additional([
                    'success' => true,
                    'message' => 'Job post created successfully.',
                ])
                ->response()
                ->setStatusCode(201);
        } catch (Throwable) {
            return response()->json([
                'success' => false,
                'message' => 'Could not create job post.',
            ], 500);
        }
    }

    /**
     * Update a job post.
     */
    #[Endpoint(
        operationId: 'updatePartnerJobPost',
        title: 'Update job post',
        description: 'Update an existing job post.',
        method: 'PUT'
    )]
    #[Response(
        status: 200,
        description: 'Job post updated successfully.',
    )]
    #[Response(
        status: 500,
        description: 'An unexpected error occurred while updating job post.',
    )]
    public function updateJobPost(
        UpdateJobPostRequest $request,
        Restaurant $restaurant,
        JobPost $jobPost
    ): JsonResponse {
        Gate::authorize('update', $jobPost);

        try {
            $jobPost = $this->jobPostService->updateJobPost(
                $request->validated(),
                $jobPost,
            );

            return JobPostResource::make($jobPost)
                ->additional([
                    'success' => true,
                    'message' => 'Job post updated successfully.',
                ])
                ->response();
        } catch (Throwable) {
            return response()->json([
                'success' => false,
                'message' => 'Could not update job post.',
            ], 500);
        }
    }

    /**
     * Delete a job post.
     */
    #[Endpoint(
        operationId: 'deletePartnerJobPost',
        title: 'Delete job post',
        description: 'Delete a job post.',
        method: 'DELETE'
    )]
    #[Response(
        status: 200,
        description: 'Job post deleted successfully.',
    )]
    #[Response(
        status: 400,
        description: 'Job post has applications and cannot be deleted.',
    )]
    #[Response(
        status: 500,
        description: 'An unexpected error occurred while deleting job post.',
    )]
    public function deleteJobPost(Restaurant $restaurant, JobPost $jobPost): JsonResponse
    {
        Gate::authorize('delete', $jobPost);

        try {
            $this->jobPostService->deleteJobPost($jobPost);

            return response()->json([
                'success' => true,
                'message' => 'Job post deleted successfully.',
            ], 200);
        } catch (JobPostHasApplicationsException $e) {
            return response()->json([
                'success' => false,
                'message' => $e->getMessage(),
            ], $e->getCode());
        } catch (Throwable) {
            return response()->json([
                'success' => false,
                'message' => 'Could not delete job post.',
            ], 500);
        }
    }

    /**
     * Delete job posts.
     */
    #[Endpoint(
        operationId: 'deletePartnerJobPosts',
        title: 'Delete job posts',
        description: 'Delete multiple job posts.',
        method: 'DELETE'
    )]
    #[Response(
        status: 200,
        description: 'Job posts deleted successfully.',
    )]
    #[Response(
        status: 400,
        description: 'Some job posts have applications and cannot be deleted.',
    )]
    #[Response(
        status: 500,
        description: 'An unexpected error occurred while deleting job posts.',
    )]
    public function deleteJobPosts(
        DeleteJobPostsRequest $request,
        Restaurant $restaurant
    ): JsonResponse {
        Gate::authorize('deleteAny', [JobPost::class, $restaurant]);

        try {
            $this->jobPostService->deleteJobPosts(
                $request->validated()
            );

            return response()->json([
                'success' => true,
                'message' => 'Job posts deleted successfully.',
            ], 200);
        } catch (JobPostHasApplicationsException $e) {
            return response()->json([
                'success' => false,
                'message' => $e->getMessage(),
            ], $e->getCode());
        } catch (Throwable) {
            return response()->json([
                'success' => false,
                'message' => 'Could not delete job posts.',
            ], 500);
        }
    }
}
