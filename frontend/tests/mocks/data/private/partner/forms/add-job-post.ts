import {
  CreateJobPostPayload,
  CreateJobPostResponse,
} from "@partner/types/job-post/job-post.api-types";

export const addJobPostForm: CreateJobPostPayload = {
  title: "test",
  description_html: '<p style="text-align: left;">test</p>',
  description_text: "test",
  employment_type: "part_time",
  salary: 10000,
};

export const addJobPostFormResponse: CreateJobPostResponse = {
  job_post: {
    ...addJobPostForm,
    id: "019a9227-53ad-7271-90bd-2e88ab8ca909",
    restaurant_id: "a0611650-d7f4-481f-ac39-de9c8d1073ed",
    employment_type: "full_time",
    status: "open",
    updated_at: "2025-11-17T14:10:42.000000Z",
    created_at: "2025-11-17T14:10:42.000000Z",
  },
  message: "Job post created successfully.",
};
