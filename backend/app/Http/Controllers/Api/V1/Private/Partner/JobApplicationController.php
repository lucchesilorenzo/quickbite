<?php

declare(strict_types=1);

namespace App\Http\Controllers\Api\V1\Private\Partner;

use App\Exceptions\Private\Partner\AlreadyEmployedException;
use App\Http\Controllers\Controller;
use App\Http\Requests\Api\V1\Private\Partner\JobApplication\GetJobApplicationsRequest;
use App\Http\Requests\Api\V1\Private\Partner\JobApplication\UpdateJobApplicationRequest;
use App\Http\Resources\Api\V1\JobApplicationResource;
use App\Models\JobApplication;
use App\Models\JobPost;
use App\Services\Private\Partner\JobApplicationService;
use Dedoc\Scramble\Attributes\Endpoint;
use Dedoc\Scramble\Attributes\Group;
use Dedoc\Scramble\Attributes\Response;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Gate;
use Illuminate\Support\Facades\Storage;
use Symfony\Component\HttpFoundation\StreamedResponse;
use Throwable;

#[Group('Partner Job Applications')]
class JobApplicationController extends Controller
{
    public function __construct(
        private readonly JobApplicationService $jobApplicationService
    ) {}

    /**
     * Get job applications.
     */
    #[Endpoint(
        operationId: 'getPartnerJobApplications',
        title: 'List job applications',
        description: 'List job applications for a specific job post.',
        method: 'GET'
    )]
    #[Response(
        status: 200,
        description: 'Job applications retrieved successfully.',
    )]
    #[Response(
        status: 500,
        description: 'An unexpected error occurred while retrieving job applications.',
    )]
    public function getJobApplications(
        GetJobApplicationsRequest $request,
        JobPost $jobPost
    ): JsonResponse {
        Gate::authorize('viewAny', [JobApplication::class, $jobPost]);

        try {
            $jobApplications = $this->jobApplicationService->getJobApplications(
                $request->validated(),
                $jobPost,
            );

            return JobApplicationResource::collection($jobApplications)
                ->additional([
                    'success' => true,
                    'message' => 'Job applications retrieved successfully.',
                ])
                ->response();
        } catch (Throwable) {
            return response()->json([
                'success' => false,
                'message' => 'Could not get job applications.',
            ], 500);
        }
    }

    /**
     * Download the resume of a job application.
     */
    #[Endpoint(
        operationId: 'downloadJobApplicationResume',
        title: 'Download resume',
        description: 'Download the resume PDF for a job application.',
        method: 'GET'
    )]
    #[Response(
        status: 200,
        description: 'Resume downloaded.',
    )]
    public function downloadResume(JobApplication $jobApplication): StreamedResponse
    {
        Gate::authorize('downloadResume', $jobApplication);

        return Storage::disk('local')->download(
            $jobApplication->resume,
            "CV_{$jobApplication->first_name}_{$jobApplication->last_name}.pdf",
        );
    }

    /**
     * Update the status of a job application.
     */
    #[Endpoint(
        operationId: 'updateJobApplicationStatus',
        title: 'Update job application status',
        description: 'Update the status of a job application.',
        method: 'PUT'
    )]
    #[Response(
        status: 200,
        description: 'Job application status updated successfully.',
    )]
    #[Response(
        status: 400,
        description: 'The applicant is already employed by the restaurant.',
    )]
    #[Response(
        status: 500,
        description: 'An unexpected error occurred while updating job application status.',
    )]
    public function updateJobApplicationStatus(
        UpdateJobApplicationRequest $request,
        JobApplication $jobApplication
    ): JsonResponse {
        Gate::authorize('update', $jobApplication);

        try {
            $jobApplication = $this->jobApplicationService->updateJobApplicationStatus(
                $request->validated(),
                $jobApplication
            );

            return JobApplicationResource::make($jobApplication)
                ->additional([
                    'success' => true,
                    'message' => 'Job application status updated successfully.',
                ])
                ->response();
        } catch (AlreadyEmployedException $e) {
            return response()->json([
                'success' => false,
                'message' => $e->getMessage(),
            ], $e->getCode());
        } catch (Throwable) {
            return response()->json([
                'success' => false,
                'message' => 'Could not update job application status.',
            ], 500);
        }
    }
}
