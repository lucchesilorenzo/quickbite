<?php

declare(strict_types=1);

namespace App\Http\Controllers\Api\V1\Private\Partner;

use App\Exceptions\Private\Partner\AlreadyEmployedException;
use App\Http\Controllers\Controller;
use App\Http\Requests\Api\V1\Private\Partner\JobApplication\GetJobApplicationsRequest;
use App\Http\Requests\Api\V1\Private\Partner\JobApplication\UpdateJobApplicationRequest;
use App\Models\JobApplication;
use App\Models\JobPost;
use App\Services\Private\Partner\JobApplicationService;
use Dedoc\Scramble\Attributes\Group;
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

            return response()->json([
                'success' => true,
                'message' => 'Job applications retrieved successfully.',
                'job_applications' => $jobApplications,
            ]);
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

            return response()->json([
                'success' => true,
                'message' => 'Job application status updated successfully.',
                'job_application' => $jobApplication,
            ]);
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
