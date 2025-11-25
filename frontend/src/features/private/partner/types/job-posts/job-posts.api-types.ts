import { TAddJobPostFormSchema } from "@partner/validations/job-posts-validations";

import { JobPost, JobPostWithApplicationsCount } from "./job-posts.types";

import { ApiResponse } from "@/types/api-types";
import { BaseOffsetPagination } from "@/types/pagination-types";
import { BaseRestaurant } from "@/types/restaurant-types";

export type GetJobPostResponse = JobPost & BaseRestaurant;

export type GetJobPostsResponse = BaseOffsetPagination & {
  data: JobPostWithApplicationsCount[];
};

export type CreateJobPostPayload = Omit<
  TAddJobPostFormSchema,
  "description"
> & {
  description: string;
};

export type CreateJobPostResponse = {
  job_post: JobPost;
} & ApiResponse;
