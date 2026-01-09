<?php

declare(strict_types=1);

namespace App\Http\Controllers\Private\Partner;

use App\Http\Controllers\Controller;
use App\Http\Requests\Private\Partner\JobApplication\GetJobApplicationsRequest;
use App\Models\JobPost;
use App\Services\Private\Partner\JobApplicationService;
use Illuminate\Http\JsonResponse;
use Throwable;

class JobApplicationController extends Controller
{
    public function __construct(
        private readonly JobApplicationService $jobApplicationService
    ) {}

    public function getJobApplications(
        GetJobApplicationsRequest $request,
        JobPost $jobPost
    ): JsonResponse {
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
}
