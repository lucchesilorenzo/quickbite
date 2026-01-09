import { JobApplication } from "@private/shared/types/job-applications/job-application.types";

import { ApiResponse } from "@/types/api.types";

export type CreateJobApplicationResponse = {
  job_application: JobApplication;
} & ApiResponse;
