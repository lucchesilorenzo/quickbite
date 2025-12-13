import { GridRowId } from "@mui/x-data-grid";
import {
  GetJobPostResponse,
  GetJobPostsResponse,
} from "@/features/private/partner/types/job-posts/job-post.api.types";
import { apiResponse } from "../../shared/common";

export const jobPostResponse: GetJobPostResponse = {
  ...apiResponse,
  job_post: {
    id: "019a9226-9299-72d8-a1a6-a6d51fbbbc5d",
    restaurant_id: "a0611650-d7f4-481f-ac39-de9c8d1073ed",
    title: "Test",
    description_html: '<p style="text-align: left;"><strong>test</strong></p>',
    description_text: "test",
    employment_type: "full_time",
    salary: 60000.3,
    status: "open",
    created_at: "2025-11-17T14:09:52.000000Z",
    updated_at: "2025-11-17T14:09:52.000000Z",
  },
};

export const jobPostsResponse: GetJobPostsResponse = {
  ...apiResponse,
  job_posts: {
    current_page: 1,
    data: [
      { ...jobPostResponse.job_post, job_applications_count: 1 },
      {
        ...jobPostResponse.job_post,
        id: "019a9227-53ad-7271-90bd-2e88ab8ca909",
        job_applications_count: 0,
      },
    ],
    first_page_url:
      "http://localhost:8000/api/partner/restaurants/a0611650-d7f4-481f-ac39-de9c8d1073ed/job-posts?page=1",
    from: 1,
    last_page: 1,
    last_page_url:
      "http://localhost:8000/api/partner/restaurants/a0611650-d7f4-481f-ac39-de9c8d1073ed/job-posts?page=1",
    links: [
      {
        url: null,
        label: "&laquo; Previous",
        page: null,
        active: false,
      },
      {
        url: "http://localhost:8000/api/partner/restaurants/a0611650-d7f4-481f-ac39-de9c8d1073ed/job-posts?page=1",
        label: "1",
        page: 1,
        active: true,
      },
      {
        url: null,
        label: "Next &raquo;",
        page: null,
        active: false,
      },
    ],
    next_page_url: null,
    path: "http://localhost:8000/api/partner/restaurants/a0611650-d7f4-481f-ac39-de9c8d1073ed/job-posts",
    per_page: 25,
    prev_page_url: null,
    to: 1,
    total: 1,
  },
};

export const jobPostIds: Set<GridRowId> = new Set([
  "019a9226-9299-72d8-a1a6-a6d51fbbbc5d",
  "019a9225-9299-72d8-a1a6-a6d51fbbbc5d",
]);
