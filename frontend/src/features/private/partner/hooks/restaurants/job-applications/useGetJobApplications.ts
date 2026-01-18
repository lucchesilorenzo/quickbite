import { GridFilterModel, GridSortModel } from "@mui/x-data-grid";
import { GetJobApplicationsResponse } from "@partner/types/job-applications/job-application.api.types";
import { useQuery } from "@tanstack/react-query";

import { fetchData } from "@/lib/api-client";

type UseGetJobApplicationsOptions = {
  jobPostId?: string;
  page: number;
  pageSize: number;
  sortBy: GridSortModel;
  filters: GridFilterModel;
};

export function useGetJobApplications({
  jobPostId,
  page,
  pageSize,
  sortBy,
  filters,
}: UseGetJobApplicationsOptions) {
  const sortField = sortBy[0]?.field;
  const sortOrder = sortBy[0]?.sort;

  return useQuery<GetJobApplicationsResponse>({
    queryKey: [
      "partner-job-applications",
      jobPostId,
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
        `/partner/job-posts/${jobPostId}/applications?${params.toString()}`,
      );
    },
    enabled: !!jobPostId,
  });
}
