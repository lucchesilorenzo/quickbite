import { createContext, useContext, useState } from "react";

import {
  MAX_SALARY,
  MIN_SALARY,
  employmentTypes,
} from "@private/shared/lib/constants/job-posts";
import { EmploymentTypeWithAll } from "@private/shared/types/job-posts/job-post.types";
import { useGetJobPosts } from "@rider/hooks/job-posts/useGetJobPosts";
import { GetJobPostsResponse } from "@rider/types/job-posts/job-post.api.types";
import {
  JobPostFilters,
  JobPostWithRestaurant,
} from "@rider/types/job-posts/job-post.types";
import {
  FetchNextPageOptions,
  InfiniteData,
  InfiniteQueryObserverResult,
} from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";

type JobPostsProviderProps = {
  children: React.ReactNode;
};

type JobPostsContext = {
  jobPostPages?: JobPostWithRestaurant[];
  isLoadingJobPosts: boolean;
  jobPostsError: Error | null;
  sortBy: string | null;
  jobPostId: string | null;
  isFetchingNextPage: boolean;
  fetchNextPage: (
    options?: FetchNextPageOptions,
  ) => Promise<InfiniteQueryObserverResult<InfiniteData<GetJobPostsResponse>>>;
  handleApplyFilters: (filters: JobPostFilters) => void;
  handleResetFilters: () => void;
  handleApplySort: (sortBy: "asc" | "desc") => void;
  handleJobPostChange: (jobPostId: string) => void;
};

const JobPostsContext = createContext<JobPostsContext | null>(null);

export default function JobPostsProvider({ children }: JobPostsProviderProps) {
  const [searchParams, setSearchParams] = useSearchParams();
  const [appliedFilters, setAppliedFilters] = useState<JobPostFilters>({
    search: searchParams.get("search") || "",
    minSalary: Number(searchParams.get("min_salary")) || MIN_SALARY,
    maxSalary: Number(searchParams.get("max_salary")) || MAX_SALARY,
    employmentType:
      (employmentTypes.find(
        (t) => t.value === searchParams.get("employment_type"),
      )?.value as EmploymentTypeWithAll) || "all",
  });

  const sortBy = searchParams.get("sort_by");
  const jobPostId = searchParams.get("job_post_id");

  const {
    data: jobPostsData,
    isLoading: isLoadingJobPosts,
    error: jobPostsError,
    fetchNextPage,
    isFetchingNextPage,
  } = useGetJobPosts({
    search: appliedFilters.search,
    minSalary: appliedFilters.minSalary,
    maxSalary: appliedFilters.maxSalary,
    employmentType: appliedFilters.employmentType,
    sortBy,
  });

  const jobPostPages = jobPostsData?.pages.flatMap(
    (page) => page.job_posts.data,
  );

  function handleApplyFilters(filters: JobPostFilters) {
    setAppliedFilters(filters);

    const shouldApplySalaryFilter =
      (filters.minSalary !== MIN_SALARY && filters.maxSalary !== MAX_SALARY) ||
      filters.minSalary !== filters.maxSalary;

    setSearchParams((prev) => ({
      ...Object.fromEntries(prev),
      job_post_id: [],
      search: appliedFilters.search || [],
      min_salary: shouldApplySalaryFilter ? filters.minSalary.toString() : [],
      max_salary: shouldApplySalaryFilter ? filters.maxSalary.toString() : [],
      employment_type:
        filters.employmentType !== "all" ? filters.employmentType : [],
    }));
  }

  function handleResetFilters() {
    setAppliedFilters({
      search: "",
      minSalary: MIN_SALARY,
      maxSalary: MAX_SALARY,
      employmentType: "all",
    });
    setSearchParams({});
  }

  function handleApplySort(sortBy: "asc" | "desc") {
    if (searchParams.get("sort_by") === sortBy) return;

    setSearchParams((prev) => ({
      ...Object.fromEntries(prev),
      sort_by: sortBy,
    }));
  }

  function handleJobPostChange(jobPostId: string) {
    setSearchParams((prev) => ({
      ...Object.fromEntries(prev),
      job_post_id: jobPostId,
    }));
  }

  return (
    <JobPostsContext.Provider
      value={{
        jobPostPages,
        isLoadingJobPosts,
        jobPostsError,
        sortBy,
        isFetchingNextPage,
        jobPostId,
        fetchNextPage,
        handleApplyFilters,
        handleResetFilters,
        handleApplySort,
        handleJobPostChange,
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
