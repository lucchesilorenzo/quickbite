import { GridFilterModel, GridSortModel } from "@mui/x-data-grid";
import { useQuery } from "@tanstack/react-query";

import { getPartnerJobPosts } from "@/api/endpoints/partner-job-posts/partner-job-posts";
import { GetPartnerJobPosts200, GetPartnerJobPostsParams } from "@/api/models";
import api from "@/lib/api-client";

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

  return useQuery<GetPartnerJobPosts200>({
    queryKey: [
      "partner-job-posts",
      restaurantId,
      page,
      pageSize,
      sortField,
      sortOrder,
      filters,
    ],
    queryFn: async () => {
      const params: GetPartnerJobPostsParams = {
        page,
        page_size: pageSize as GetPartnerJobPostsParams["page_size"],
      };

      if (sortField && sortOrder) {
        params.sort_by = JSON.stringify({ field: sortField, sort: sortOrder });
      }

      if (filters.items?.length && filters.items.length > 0) {
        params.filter = JSON.stringify(filters.items[0]);
      }

      if (
        Array.isArray(filters.quickFilterValues) &&
        filters.quickFilterValues.length > 0
      ) {
        params.search = filters.quickFilterValues[0];
      }

      const response = await getPartnerJobPosts(api).getPartnerJobPosts(
        restaurantId,
        params,
      );

      return response.data;
    },
    enabled: !!restaurantId,
  });
}
