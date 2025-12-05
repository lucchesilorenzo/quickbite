import { GridFilterModel, GridSortModel } from "@mui/x-data-grid";
import { GetJobPostsResponse } from "@partner/types/job-post/job-post.api-types";
import { useQuery } from "@tanstack/react-query";

import { fetchData } from "@/lib/api-client";

type UseGetJobPostsOptions = {
  restaurantId: string;
  page: number;
  pageSize: number;
  sortBy: GridSortModel;
  filters: GridFilterModel;
};

export function useGetJobPosts({
  restaurantId,
  page,
  pageSize,
  sortBy,
  filters,
}: UseGetJobPostsOptions) {
  return useQuery<GetJobPostsResponse>({
    queryKey: [
      "partner-job-posts",
      restaurantId,
      page,
      pageSize,
      sortBy,
      filters,
    ],
    queryFn: () => {
      const params = new URLSearchParams();

      if (page) {
        params.append("page", page.toString());
      }

      if (pageSize) {
        params.append("page_size", pageSize.toString());
      }

      if (sortBy.length > 0 && sortBy[0].field && sortBy[0].sort) {
        params.append("sort_by", JSON.stringify(sortBy[0]));
      }

      if (filters.items?.length > 0) {
        params.append("filter", JSON.stringify(filters.items[0]));
      }

      if (
        Array.isArray(filters.quickFilterValues) &&
        filters.quickFilterValues.length > 0
      ) {
        params.append("search", filters.quickFilterValues[0]);
      }

      return fetchData(
        `/partner/restaurants/${restaurantId}/job-posts?${params.toString()}`,
      );
    },
    enabled: !!restaurantId,
  });
}
