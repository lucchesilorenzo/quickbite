import { EmploymentType, JobPostStatus } from "@/api/models";

export const employmentTypes: {
  value: EmploymentType;
  label: string;
}[] = [
  { value: "full_time", label: "Full-time" },
  { value: "part_time", label: "Part-time" },
  { value: "contract", label: "Contract" },
];

export const jobPostStatuses: { value: JobPostStatus; label: string }[] = [
  { value: "open", label: "Open" },
  { value: "closed", label: "Closed" },
];

export const MIN_SALARY = 10000;

export const MAX_SALARY = 100000;
