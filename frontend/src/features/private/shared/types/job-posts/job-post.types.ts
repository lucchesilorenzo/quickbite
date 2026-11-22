import { EmploymentType } from "@/api/backend/models";

export type EmploymentTypeWithAll = EmploymentType | "all";

export type JobPostFilters = {
  search: string;
  minSalary: number;
  maxSalary: number;
  salaryEnabled: boolean;
  employmentType: EmploymentTypeWithAll;
};
