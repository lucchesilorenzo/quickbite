import { GridFilterModel, GridSortModel } from "@mui/x-data-grid";
import { useQuery } from "@tanstack/react-query";

import { getPartnerStaff } from "@/api/endpoints/partner-staff/partner-staff";
import {
  GetPartnerStaffMembers200,
  GetPartnerStaffMembersParams,
} from "@/api/models";
import api from "@/lib/api-client";

type UseGetStaffMembersOptions = {
  restaurantId: string;
  page: number;
  pageSize: number;
  sortBy: GridSortModel;
  filters: GridFilterModel;
};

export function useGetStaffMembers({
  restaurantId,
  page,
  pageSize,
  sortBy,
  filters,
}: UseGetStaffMembersOptions) {
  const sortField = sortBy[0]?.field;
  const sortOrder = sortBy[0]?.sort;

  return useQuery<GetPartnerStaffMembers200>({
    queryKey: [
      "partner-staff",
      restaurantId,
      page,
      pageSize,
      sortField,
      sortOrder,
      filters,
    ],
    queryFn: async () => {
      const params: GetPartnerStaffMembersParams = {
        page,
        page_size: pageSize as GetPartnerStaffMembersParams["page_size"],
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

      const response = await getPartnerStaff(api).getPartnerStaffMembers(
        restaurantId,
        params,
      );

      return response.data;
    },
    enabled: !!restaurantId,
  });
}
