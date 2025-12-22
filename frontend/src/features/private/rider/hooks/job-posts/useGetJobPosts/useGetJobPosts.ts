import {
  MAX_SALARY,
  MIN_SALARY,
} from "@private/shared/lib/constants/job-posts";
import { EmploymentTypeWithAll } from "@private/shared/types/job-posts/job-post.types";
import { GetJobPostsResponse } from "@rider/types/job-posts/job-post.api.types";
import { useQuery } from "@tanstack/react-query";

import { fetchData } from "@/lib/api-client";

type UseGetJobPostsOptions = {
  page: number;
  search: string;
  minSalary: number;
  maxSalary: number;
  employmentType: EmploymentTypeWithAll;
  sortBy: string | null;
};

export function useGetJobPosts({
  page = 1,
  search,
  minSalary,
  maxSalary,
  employmentType,
  sortBy,
}: UseGetJobPostsOptions) {
  return useQuery<GetJobPostsResponse>({
    queryKey: [
      "rider-job-posts",
      page,
      search,
      minSalary,
      maxSalary,
      employmentType,
      sortBy,
    ],
    queryFn: () => {
      const params = new URLSearchParams();

      const isDefaultRange =
        minSalary === MIN_SALARY && maxSalary === MAX_SALARY;

      const isValidRange = minSalary < maxSalary;

      if (search) {
        params.append("search", search);
      }

      if (!isDefaultRange && isValidRange) {
        params.append("min_salary", minSalary.toString());
        params.append("max_salary", maxSalary.toString());
      }

      if (employmentType !== "all") {
        params.append("employment_type", employmentType);
      }

      if (sortBy) {
        params.append("sort_by", sortBy);
      }

      if (page) {
        params.append("page", page.toString());
      }

      return fetchData(`/rider/job-posts?${params.toString()}`);
    },
  });
}
