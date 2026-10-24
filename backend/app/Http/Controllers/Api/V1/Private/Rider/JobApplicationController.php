<?php

declare(strict_types=1);

namespace App\Http\Controllers\Api\V1\Private\Rider;

use App\Http\Controllers\Controller;
use App\Http\Requests\Api\V1\Private\Rider\JobApplication\CreateJobApplicationRequest;
use App\Http\Resources\Api\V1\JobApplicationResource;
use App\Models\JobApplication;
use App\Models\JobPost;
use App\Services\Private\Rider\JobApplicationService;
use Dedoc\Scramble\Attributes\Endpoint;
use Dedoc\Scramble\Attributes\Group;
use Dedoc\Scramble\Attributes\IgnoreResponse;
use Dedoc\Scramble\Attributes\Response;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Gate;
use Throwable;

#[Group('Rider Job Applications')]
class JobApplicationController extends Controller
{
    public function __construct(
        private readonly JobApplicationService $jobApplicationService
    ) {}

    /**
     * Create a job application.
     */
    #[Endpoint(
        operationId: 'createRiderJobApplication',
        title: 'Create job application',
        description: 'Apply to a job post.',
        method: 'POST'
    )]
    #[IgnoreResponse(200)]
    #[Response(
        status: 201,
        description: 'Job application created successfully.',
    )]
    #[Response(
        status: 500,
        description: 'An unexpected error occurred while creating job application.',
    )]
    public function createJobApplication(
        CreateJobApplicationRequest $request,
        JobPost $jobPost
    ): JsonResponse {
        Gate::authorize('create', [JobApplication::class, $jobPost]);

        try {
            $jobApplication = $this->jobApplicationService->createJobApplication(
                auth()->user(),
                $request->validated(),
                $jobPost
            );

            return JobApplicationResource::make($jobApplication)
                ->additional([
                    'success' => true,
                    'message' => 'Job application created successfully.',
                ])
                ->response()
                ->setStatusCode(201);
        } catch (Throwable) {
            return response()->json([
                'success' => false,
                'message' => 'Could not create job application.',
            ], 500);
        }
    }
}
