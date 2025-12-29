import { EmploymentType } from "@private/shared/types/job-posts/job-post.types";

export const employmentTypes: {
  value: EmploymentType | string;
  label: string;
}[] = [
  { value: "full_time", label: "Full-time" },
  { value: "part_time", label: "Part-time" },
  { value: "contract", label: "Contract" },
];

export const jobPostStatuses: { value: "open" | "closed"; label: string }[] = [
  { value: "open", label: "Open" },
  { value: "closed", label: "Closed" },
];

export const MIN_SALARY = 10000;

export const MAX_SALARY = 100000;
