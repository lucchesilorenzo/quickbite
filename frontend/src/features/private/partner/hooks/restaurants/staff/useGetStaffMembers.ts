import { GridFilterModel, GridSortModel } from "@mui/x-data-grid";
import { GetStaffMembersResponse } from "@partner/types/staff/staff.api.types";
import { useQuery } from "@tanstack/react-query";

import { fetchData } from "@/lib/api-client";

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

  return useQuery<GetStaffMembersResponse>({
    queryKey: [
      "partner-staff",
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
        `/partner/restaurants/${restaurantId}/staff?${params.toString()}`,
      );
    },
    enabled: !!restaurantId,
  });
}
