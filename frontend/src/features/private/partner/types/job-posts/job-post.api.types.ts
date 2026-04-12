import { TAddJobPostFormSchema } from "@partner/schemas/job-posts.schema";
import { JobPost } from "@private/shared/types/job-posts/job-post.types";

import { JobPostsWithPagination } from "./job-post.types";

import { ApiResponse } from "@/types/api.types";

export type GetJobPostResponse = {
  job_post: JobPost;
} & ApiResponse;

export type GetJobPostsResponse = {
  job_posts: JobPostsWithPagination;
} & ApiResponse;

export type CreateJobPostRequest = TAddJobPostFormSchema;

export type CreateJobPostResponse = GetJobPostResponse;

export type UpdateJobPostRequest = CreateJobPostRequest & {
  status: "open" | "closed";
};

export type UpdateJobPostResponse = CreateJobPostResponse;
