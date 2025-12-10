import { BaseOffsetPagination } from "@/types/pagination.types";

export type EmploymentType = "full_time" | "part_time" | "contract";
export type JobPostStatus = "open" | "closed";

export type JobPost = {
  id: string;
  restaurant_id: string;
  title: string;
  description_html: string;
  description_text: string;
  employment_type: EmploymentType;
  salary: number | null;
  status: JobPostStatus;
  created_at: string;
  updated_at: string;
};

export type JobPostWithApplicationsCount = JobPost & {
  job_applications_count: number;
};

export type JobPostsWithPagination = BaseOffsetPagination & {
  data: JobPostWithApplicationsCount[];
};
