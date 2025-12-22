import { JobPostsWithRestaurantAndPagination } from "./job-post.types";

import { ApiResponse } from "@/types/api.types";

export type GetJobPostsResponse = {
  job_posts: JobPostsWithRestaurantAndPagination;
} & ApiResponse;
