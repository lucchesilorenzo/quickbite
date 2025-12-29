export type EmploymentType = "full_time" | "part_time" | "contract";

export type EmploymentTypeWithAll = EmploymentType | "all";

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
