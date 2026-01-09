import { JobApplication } from "@private/shared/types/job-applications/job-application.types";

import { BaseOffsetPagination } from "@/types/pagination.types";

export type JobApplicationsWithPagination = BaseOffsetPagination & {
  data: JobApplication[];
};
