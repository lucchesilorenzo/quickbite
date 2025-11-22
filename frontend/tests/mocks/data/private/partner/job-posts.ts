import { GetJobPostsResponse } from "@partner/types/job-posts/job-posts.api-types";

export const jobPost: GetJobPostsResponse = {
  current_page: 1,
  data: [
    {
      id: "019a9226-9299-72d8-a1a6-a6d51fbbbc5d",
      restaurant_id: "a0611650-d7f4-481f-ac39-de9c8d1073ed",
      title: "Test",
      description: '<p style="text-align: left;"><strong>test</strong></p>',
      employment_type: "full_time",
      salary: 60000.3,
      status: "open",
      created_at: "2025-11-17T14:09:52.000000Z",
      updated_at: "2025-11-17T14:09:52.000000Z",
      job_applications_count: 1,
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
};
