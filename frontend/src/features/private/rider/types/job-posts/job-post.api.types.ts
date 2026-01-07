import {
  JobPostWithRestaurantAndAlreadyApplied,
  JobPostsWithRestaurantAndPagination,
} from "./job-post.types";

import { ApiResponse } from "@/types/api.types";

export type GetJobPostsResponse = {
  job_posts: JobPostsWithRestaurantAndPagination;
} & ApiResponse;

export type GetJobPostResponse = {
  job_post: JobPostWithRestaurantAndAlreadyApplied;
} & ApiResponse;
