import { JobPost } from "@private/shared/types/job-posts/job-post.types";

import { BaseOffsetPagination } from "@/types/pagination.types";

export type JobPostWithApplicationsCount = JobPost & {
  job_applications_count: number;
};

export type JobPostsWithPagination = BaseOffsetPagination & {
  data: JobPostWithApplicationsCount[];
};
