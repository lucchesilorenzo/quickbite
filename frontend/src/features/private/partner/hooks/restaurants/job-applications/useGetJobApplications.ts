import { GridFilterModel, GridSortModel } from "@mui/x-data-grid";
import { useQuery } from "@tanstack/react-query";

import { getPartnerJobApplications } from "@/api/endpoints/partner-job-applications/partner-job-applications";
import {
  GetPartnerJobApplications200,
  GetPartnerJobApplicationsParams,
} from "@/api/models";
import api from "@/lib/api-client";

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

  return useQuery<GetPartnerJobApplications200>({
    queryKey: [
      "partner-job-applications",
      jobPostId,
      page,
      pageSize,
      sortField,
      sortOrder,
      filters,
    ],
    queryFn: async () => {
      const params: GetPartnerJobApplicationsParams = {
        page,
        page_size: pageSize as GetPartnerJobApplicationsParams["page_size"],
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

      const response = await getPartnerJobApplications(
        api,
      ).getPartnerJobApplications(jobPostId ?? "", params);

      return response.data;
    },
    enabled: !!jobPostId,
  });
}
