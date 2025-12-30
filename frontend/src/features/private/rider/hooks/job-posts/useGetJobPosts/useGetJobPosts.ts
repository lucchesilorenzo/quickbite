import { EmploymentTypeWithAll } from "@private/shared/types/job-posts/job-post.types";
import { GetJobPostsResponse } from "@rider/types/job-posts/job-post.api.types";
import { useInfiniteQuery } from "@tanstack/react-query";

import { fetchData } from "@/lib/api-client";

export type UseGetJobPostsOptions = {
  search: string;
  minSalary: number;
  maxSalary: number;
  salaryEnabled: boolean;
  employmentType: EmploymentTypeWithAll;
  sortBy: string | null;
};

export function useGetJobPosts({
  search,
  minSalary,
  maxSalary,
  salaryEnabled,
  employmentType,
  sortBy,
}: UseGetJobPostsOptions) {
  return useInfiniteQuery<GetJobPostsResponse>({
    queryKey: [
      "rider-job-posts",
      search,
      minSalary,
      maxSalary,
      salaryEnabled,
      employmentType,
      sortBy,
    ],
    queryFn: ({ pageParam }) => {
      const params = new URLSearchParams();

      if (search) {
        params.append("search", search);
      }

      if (salaryEnabled && minSalary && maxSalary) {
        params.append("min_salary", minSalary.toString());
        params.append("max_salary", maxSalary.toString());
      }

      if (employmentType !== "all") {
        params.append("employment_type", employmentType);
      }

      if (sortBy) {
        params.append("sort_by", sortBy);
      }

      if (pageParam) {
        params.append("cursor", pageParam.toString());
      }

      return fetchData(`/rider/job-posts?${params.toString()}`);
    },
    initialPageParam: null,
    getNextPageParam: (lastPage) => lastPage.job_posts.next_cursor,
  });
}
