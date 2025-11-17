import {
  CreateJobPostPayload,
  CreateJobPostResponse,
} from "@partner/types/job-posts/job-posts.api-types";

export const addJobPostForm: CreateJobPostPayload = {
  title: "test",
  description: '<p style="text-align: left;">test</p>',
  employment_type: "part_time",
  salary: 10000,
};

export const addJobPostFormResponse: CreateJobPostResponse = {
  job_post: {
    title: "test",
    description: '<p style="text-align: left;"><em>te</em></p>',
    employment_type: "full_time",
    salary: 20000,
    restaurant_id: "a0611650-d7f4-481f-ac39-de9c8d1073ed",
    id: "019a9227-53ad-7271-90bd-2e88ab8ca909",
    updated_at: "2025-11-17T14:10:42.000000Z",
    created_at: "2025-11-17T14:10:42.000000Z",
  },
  message: "Job post created successfully.",
};
