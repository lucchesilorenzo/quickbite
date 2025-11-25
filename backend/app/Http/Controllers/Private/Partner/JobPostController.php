<?php

declare(strict_types=1);

namespace App\Http\Controllers\Private\Partner;

use App\Http\Controllers\Controller;
use App\Http\Requests\Private\Partner\JobPost\CreateJobPostRequest;
use App\Http\Requests\Private\Partner\JobPost\DeleteJobPostsRequest;
use App\Http\Requests\Private\Partner\JobPost\GetJobPostsRequest;
use App\Models\JobPost;
use App\Models\Restaurant;
use App\Services\Private\Partner\JobPostService;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Gate;
use Throwable;

class JobPostController extends Controller
{
    public function __construct(
        private readonly JobPostService $jobPostService
    ) {}

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

            return response()->json($jobPosts, 200);
        } catch (Throwable) {
            return response()->json([
                'message' => 'Could not get job posts.',
            ], 500);
        }
    }

    public function getJobPost(Restaurant $restaurant, JobPost $jobPost): JsonResponse
    {
        Gate::authorize('view', $jobPost);

        try {
            $jobPost = $this->jobPostService->getJobPost($jobPost);

            return response()->json($jobPost, 200);
        } catch (Throwable) {
            return response()->json([
                'message' => 'Could not get job post.',
            ], 500);
        }
    }

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

            return response()->json([
                'job_post' => $jobPost,
                'message' => 'Job post created successfully.',
            ], 201);
        } catch (Throwable) {
            return response()->json([
                'message' => 'Could not create job post.',
            ], 500);
        }
    }

    public function deleteJobPost(Restaurant $restaurant, JobPost $jobPost): JsonResponse
    {
        Gate::authorize('delete', $jobPost);

        try {
            $this->jobPostService->deleteJobPost($jobPost);

            return response()->json([
                'message' => 'Job post deleted successfully.',
            ], 200);
        } catch (Throwable) {
            return response()->json([
                'message' => 'Could not delete job post.',
            ], 500);
        }
    }

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
                'message' => 'Job posts deleted successfully.',
            ], 200);
        } catch (Throwable) {
            return response()->json([
                'message' => 'Could not delete job posts.',
            ], 500);
        }
    }
}
