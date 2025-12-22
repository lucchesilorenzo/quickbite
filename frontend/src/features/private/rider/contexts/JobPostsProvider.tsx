import { createContext, useContext, useState } from "react";

import {
  MAX_SALARY,
  MIN_SALARY,
  employmentTypes,
} from "@private/shared/lib/constants/job-posts";
import { EmploymentTypeWithAll } from "@private/shared/types/job-posts/job-post.types";
import { useSearchParams } from "react-router-dom";

import { useGetJobPosts } from "../hooks/job-posts/useGetJobPosts/useGetJobPosts";
import { jobPostsDefaults } from "../lib/query-defaults";

type JobPostsProviderProps = {
  children: React.ReactNode;
};

type JobPostsContext = {
  jobPostsData: any;
  isLoadingJobPosts: boolean;
  jobPostsError: Error | null;
  searchQuery: string;
  salaryRange: number[];
  employmentType: EmploymentTypeWithAll;
  sortBy: string | null;
  setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
  setSalaryRange: React.Dispatch<React.SetStateAction<number[]>>;
  setEmploymentType: React.Dispatch<
    React.SetStateAction<EmploymentTypeWithAll>
  >;
};

const JobPostsContext = createContext<JobPostsContext | null>(null);

export default function JobPostsProvider({ children }: JobPostsProviderProps) {
  const [searchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState(
    searchParams.get("search") || "",
  );
  const [salaryRange, setSalaryRange] = useState<number[]>([
    Number(searchParams.get("min_salary")) || MIN_SALARY,
    Number(searchParams.get("max_salary")) || MAX_SALARY,
  ]);
  const [employmentType, setEmploymentType] = useState<EmploymentTypeWithAll>(
    (employmentTypes.find(
      (type) => type.value === searchParams.get("employment_type"),
    )?.value as EmploymentTypeWithAll) || "all",
  );

  const sortBy = searchParams.get("sort_by");

  const {
    data: jobPostsData = {
      success: false,
      message: "",
      job_posts: jobPostsDefaults,
    },
    isLoading: isLoadingJobPosts,
    error: jobPostsError,
  } = useGetJobPosts({
    page: 1,
    search: searchQuery,
    minSalary: salaryRange[0],
    maxSalary: salaryRange[1],
    employmentType,
    sortBy,
  });

  return (
    <JobPostsContext.Provider
      value={{
        jobPostsData,
        isLoadingJobPosts,
        jobPostsError,
        searchQuery,
        salaryRange,
        employmentType,
        sortBy,
        setSearchQuery,
        setSalaryRange,
        setEmploymentType,
      }}
    >
      {children}
    </JobPostsContext.Provider>
  );
}

export function useJobPosts() {
  const context = useContext(JobPostsContext);

  if (!context) {
    throw new Error("useJobPosts must be used within a JobPostsProvider.");
  }

  return context;
}
