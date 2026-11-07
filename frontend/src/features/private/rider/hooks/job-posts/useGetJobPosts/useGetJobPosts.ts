import { EmploymentTypeWithAll } from "@private/shared/types/job-posts/job-post.types";
import { useInfiniteQuery } from "@tanstack/react-query";

import { getRiderJobPosts } from "@/api/endpoints/rider-job-posts/rider-job-posts";
import {
  GetRiderJobPosts200,
  GetRiderJobPostsParams,
  GetRiderJobPostsSortBy,
} from "@/api/models";
import api from "@/lib/api-client";

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
  return useInfiniteQuery<GetRiderJobPosts200>({
    queryKey: [
      "rider-job-posts",
      search,
      minSalary,
      maxSalary,
      salaryEnabled,
      employmentType,
      sortBy,
    ],
    queryFn: async ({ pageParam }) => {
      const params: GetRiderJobPostsParams = {};

      if (search) {
        params.search = search;
      }

      if (salaryEnabled && minSalary && maxSalary) {
        params.min_salary = minSalary;
        params.max_salary = maxSalary;
      }

      if (employmentType !== "all") {
        params.employment_type = employmentType;
      }

      if (sortBy) {
        params.sort_by = sortBy as GetRiderJobPostsSortBy;
      }

      if (pageParam) {
        params.cursor = pageParam.toString();
      }

      const response = await getRiderJobPosts(api).getRiderJobPosts(params);

      return response.data;
    },
    initialPageParam: null,
    getNextPageParam: (lastPage) => lastPage.meta.next_cursor,
  });
}
