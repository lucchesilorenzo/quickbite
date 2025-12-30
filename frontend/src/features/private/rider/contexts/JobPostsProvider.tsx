import { createContext, useContext } from "react";

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
  filters: JobPostFilters;
  jobPostPages?: JobPostWithRestaurant[];
  isLoadingJobPosts: boolean;
  jobPostsError: Error | null;
  sortBy: string | null;
  jobPostId: string | null;
  isFetchingNextPage: boolean;
  fetchNextPage: (
    options?: FetchNextPageOptions,
  ) => Promise<InfiniteQueryObserverResult<InfiniteData<GetJobPostsResponse>>>;
  handleApplySort: (sortBy: "asc" | "desc") => void;
  handleJobPostChange: (jobPostId: string | null) => void;
};

const JobPostsContext = createContext<JobPostsContext | null>(null);

export default function JobPostsProvider({ children }: JobPostsProviderProps) {
  const [searchParams, setSearchParams] = useSearchParams();

  const filters: JobPostFilters = {
    search: searchParams.get("search") || "",
    minSalary: Number(searchParams.get("min_salary")) || MIN_SALARY,
    maxSalary: Number(searchParams.get("max_salary")) || MAX_SALARY,
    salaryEnabled:
      searchParams.has("min_salary") || searchParams.has("max_salary"),
    employmentType:
      (employmentTypes.find(
        (t) => t.value === searchParams.get("employment_type"),
      )?.value as EmploymentTypeWithAll) || "all",
  };
  const sortBy = searchParams.get("sort_by");
  const jobPostId = searchParams.get("job_post_id");

  const {
    data: jobPostsData,
    isLoading: isLoadingJobPosts,
    error: jobPostsError,
    fetchNextPage,
    isFetchingNextPage,
  } = useGetJobPosts({
    search: filters.search,
    minSalary: filters.minSalary,
    maxSalary: filters.maxSalary,
    salaryEnabled: filters.salaryEnabled,
    employmentType: filters.employmentType,
    sortBy,
  });

  const jobPostPages = jobPostsData?.pages.flatMap(
    (page) => page.job_posts.data,
  );

  function handleApplySort(sortBy: "asc" | "desc") {
    if (searchParams.get("sort_by") === sortBy) return;

    setSearchParams((prev) => ({
      ...Object.fromEntries(prev),
      sort_by: sortBy,
    }));
  }

  function handleJobPostChange(nextJobPostId: string | null) {
    setSearchParams((prev) => {
      const params = Object.fromEntries(prev);
      const currentJobPostId = params.job_post_id;

      if (!nextJobPostId || currentJobPostId === nextJobPostId) {
        delete params.job_post_id;
        return params;
      }

      return { ...params, job_post_id: nextJobPostId };
    });
  }

  return (
    <JobPostsContext.Provider
      value={{
        filters,
        jobPostPages,
        isLoadingJobPosts,
        jobPostsError,
        sortBy,
        isFetchingNextPage,
        jobPostId,
        fetchNextPage,
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
