import { createContext, useContext, useEffect, useState } from "react";

import {
  MAX_SALARY,
  MIN_SALARY,
  employmentTypes,
} from "@private/shared/lib/constants/job-posts";
import { EmploymentTypeWithAll } from "@private/shared/types/job-posts/job-post.types";
import { useGetJobPosts } from "@rider/hooks/job-posts/useGetJobPosts";
import { GetJobPostsResponse } from "@rider/types/job-posts/job-post.api.types";
import { JobPostWithRestaurant } from "@rider/types/job-posts/job-post.types";
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
  searchQuery: string;
  salaryRange: number[];
  employmentType: EmploymentTypeWithAll;
  sortBy: string | null;
  jobPostId: string | null;
  isFetchingNextPage: boolean;
  fetchNextPage: (
    options?: FetchNextPageOptions,
  ) => Promise<InfiniteQueryObserverResult<InfiniteData<GetJobPostsResponse>>>;
  setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
  setSalaryRange: React.Dispatch<React.SetStateAction<number[]>>;
  setEmploymentType: React.Dispatch<
    React.SetStateAction<EmploymentTypeWithAll>
  >;
  handleApplyFilters: () => void;
  handleResetFilters: () => void;
  handleApplySort: (sortBy: "asc" | "desc") => void;
  handleJobPostChange: (jobPostId: string) => void;
};

const JobPostsContext = createContext<JobPostsContext | null>(null);

export default function JobPostsProvider({ children }: JobPostsProviderProps) {
  const [searchParams, setSearchParams] = useSearchParams();
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
  const jobPostId = searchParams.get("job_post_id");

  const {
    data: jobPostsData,
    isLoading: isLoadingJobPosts,
    error: jobPostsError,
    fetchNextPage,
    isFetchingNextPage,
  } = useGetJobPosts({
    search: searchQuery,
    minSalary: salaryRange[0],
    maxSalary: salaryRange[1],
    employmentType,
    sortBy,
  });

  const jobPostPages = jobPostsData?.pages.flatMap(
    (page) => page.job_posts.data,
  );

  useEffect(() => {
    if (!jobPostPages?.length) return;

    if (!jobPostId) {
      setSearchParams((prev) => ({
        ...Object.fromEntries(prev),
        job_post_id: jobPostPages[0].id,
      }));

      return;
    }

    const exists = jobPostPages.some((job) => job.id === jobPostId);

    if (!exists) {
      setSearchParams((prev) => ({
        ...Object.fromEntries(prev),
        job_post_id: jobPostPages[0].id,
      }));
    }
  }, [jobPostPages, searchParams, jobPostId, setSearchParams]);

  function handleApplyFilters() {
    const shouldApplySalaryFilter =
      (salaryRange[0] !== MIN_SALARY && salaryRange[1] !== MAX_SALARY) ||
      salaryRange[0] !== salaryRange[1];

    setSearchParams((prev) => ({
      ...Object.fromEntries(prev),
      search: searchQuery !== "" ? searchQuery : [],
      min_salary: shouldApplySalaryFilter ? salaryRange[0].toString() : [],
      max_salary: shouldApplySalaryFilter ? salaryRange[1].toString() : [],
      employment_type: employmentType !== "all" ? employmentType : [],
    }));
  }

  function handleResetFilters() {
    setSearchQuery("");
    setSalaryRange([MIN_SALARY, MAX_SALARY]);
    setEmploymentType("all");
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
        searchQuery,
        salaryRange,
        employmentType,
        sortBy,
        isFetchingNextPage,
        jobPostId,
        fetchNextPage,
        setSearchQuery,
        setSalaryRange,
        setEmploymentType,
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
