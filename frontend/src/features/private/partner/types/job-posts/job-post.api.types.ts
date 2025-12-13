import { TAddJobPostFormSchema } from "@partner/schemas/job-posts.schema";

import { JobPost, JobPostsWithPagination } from "./job-post.types";

import { ApiResponse } from "@/types/api.types";

export type GetJobPostResponse = {
  job_post: JobPost;
} & ApiResponse;

export type GetJobPostsResponse = {
  job_posts: JobPostsWithPagination;
} & ApiResponse;

export type CreateJobPostPayload = TAddJobPostFormSchema;

export type CreateJobPostResponse = GetJobPostResponse;

export type UpdateJobPostPayload = CreateJobPostPayload & {
  status: "open" | "closed";
};

export type UpdateJobPostResponse = CreateJobPostResponse;
