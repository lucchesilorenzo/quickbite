import { GridFilterModel, GridSortModel } from "@mui/x-data-grid";
import { useQuery } from "@tanstack/react-query";

import { GetJobPostsResponse } from "@/features/private/partner/types/job-posts/job-post.api.types";
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
  const sortField = sortBy[0]?.field;
  const sortOrder = sortBy[0]?.sort;

  return useQuery<GetJobPostsResponse>({
    queryKey: [
      "partner-job-posts",
      restaurantId,
      page,
      pageSize,
      sortField,
      sortOrder,
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

      if (sortField && sortOrder) {
        params.append(
          "sort_by",
          JSON.stringify({ field: sortField, sort: sortOrder }),
        );
      }

      if (filters.items?.length && filters.items.length > 0) {
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
