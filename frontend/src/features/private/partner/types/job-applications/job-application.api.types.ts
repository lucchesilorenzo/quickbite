import { JobApplicationsWithPagination } from "./job-application.types";

import { ApiResponse } from "@/types/api.types";

export type GetJobApplicationsResponse = {
  job_applications: JobApplicationsWithPagination;
} & ApiResponse;
