import { JobApplication } from "@private/shared/types/job-applications/job-application.types";

import { JobApplicationsWithPagination } from "./job-application.types";

import { ApiResponse } from "@/types/api.types";

export type GetJobApplicationsResponse = {
  job_applications: JobApplicationsWithPagination;
} & ApiResponse;

export type UpdateJobApplicationStatusResponse = {
  job_application: JobApplication;
} & ApiResponse;

export type UpdateJobApplicationStatusRequest = {
  status: JobApplication["status"];
};
