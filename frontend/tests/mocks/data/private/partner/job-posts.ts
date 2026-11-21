import { GridRowId } from "@mui/x-data-grid";

import { GetPartnerJobPost200, GetPartnerJobPosts200 } from "@/api/models";

export const jobPostResponse: GetPartnerJobPost200 = {
  success: true,
  message: "Job post retrieved successfully.",
  data: {
    id: "019a9226-9299-72d8-a1a6-a6d51fbbbc5d",
    restaurant_id: "a0611650-d7f4-481f-ac39-de9c8d1073ed",
    title: "Test",
    description_html: '<p style="text-align: left;"><strong>test</strong></p>',
    description_text: "test",
    employment_type: "full_time",
    vehicle_type: "scooter",
    salary: 60000.3,
    status: "open",
    created_at: "2025-11-17T14:09:52.000000Z",
    updated_at: "2025-11-17T14:09:52.000000Z",
  },
};

export const jobPostsResponse: GetPartnerJobPosts200 = {
  data: [
    { ...jobPostResponse.data, job_applications_count: 1 },
    {
      ...jobPostResponse.data,
      id: "019a9227-53ad-7271-90bd-2e88ab8ca909",
      job_applications_count: 0,
    },
  ],
  links: {
    first:
      "http://localhost:8000/api/v1/partner/restaurants/a0611650-d7f4-481f-ac39-de9c8d1073ed/job-posts?page=1",
    last: "http://localhost:8000/api/v1/partner/restaurants/a0611650-d7f4-481f-ac39-de9c8d1073ed/job-posts?page=1",
    prev: null,
    next: null,
  },
  meta: {
    current_page: 1,
    from: 1,
    last_page: 1,
    links: [
      {
        url: null,
        label: "&laquo; Previous",
        active: false,
      },
      {
        url: "http://localhost:8000/api/v1/partner/restaurants/a0611650-d7f4-481f-ac39-de9c8d1073ed/job-posts?page=1",
        label: "1",
        active: true,
      },
      {
        url: null,
        label: "Next &raquo;",
        active: false,
      },
    ],
    path: "http://localhost:8000/api/v1/partner/restaurants/a0611650-d7f4-481f-ac39-de9c8d1073ed/job-posts",
    per_page: 25,
    to: 1,
    total: 1,
  },
  success: true,
  message: "Job posts retrieved successfully.",
};

export const jobPostIds: Set<GridRowId> = new Set([
  "019a9226-9299-72d8-a1a6-a6d51fbbbc5d",
  "019a9225-9299-72d8-a1a6-a6d51fbbbc5d",
]);
