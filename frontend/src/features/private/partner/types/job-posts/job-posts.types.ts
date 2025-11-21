export type EmploymentType = "full_time" | "part_time" | "contract";
export type JobPostStatus = "open" | "closed";

export type JobPostWithApplicationsCount = {
  id: string;
  restaurant_id: string;
  title: string;
  description: string;
  employment_type: EmploymentType;
  salary: number | null;
  status: JobPostStatus;
  job_applications_count: number;
  created_at: string;
  updated_at: string;
};
