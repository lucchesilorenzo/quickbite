import { TAddJobPostFormSchema } from "@partner/validations/job-posts-validations";

export type CreateJobPostPayload = Omit<
  TAddJobPostFormSchema,
  "description"
> & {
  description: string;
};

export type CreateJobPostResponse = {
  job_post: {
    id: string;
    title: string;
    description: string;
    employment_type: string;
    salary: number | null;
    restaurant_id: string;
    created_at: string;
    updated_at: string;
  };
  message: string;
};
