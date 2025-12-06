import { TAddJobPostFormSchema } from "@partner/schemas/job-posts.schema";

import { JobPost, JobPostWithApplicationsCount } from "./job-post.types";

import { ApiResponse } from "@/types/api.types";
import { BaseOffsetPagination } from "@/types/pagination.types";

export type GetJobPostResponse = JobPost;

export type GetJobPostsResponse = BaseOffsetPagination & {
  data: JobPostWithApplicationsCount[];
};

export type CreateJobPostPayload = TAddJobPostFormSchema;

export type CreateJobPostResponse = {
  job_post: JobPost;
} & ApiResponse;

export type UpdateJobPostPayload = CreateJobPostPayload & {
  status: "open" | "closed";
};

export type UpdateJobPostResponse = CreateJobPostResponse;
