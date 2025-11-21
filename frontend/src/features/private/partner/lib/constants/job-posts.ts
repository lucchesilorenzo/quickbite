import { EmploymentType } from "@partner/types/job-posts/job-posts.types";

export const employmentTypes: {
  value: EmploymentType | string;
  label: string;
}[] = [
  { value: "full_time", label: "Full-time" },
  { value: "part_time", label: "Part-time" },
  { value: "contract", label: "Contract" },
];
