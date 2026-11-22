import { useQuery } from "@tanstack/react-query";

import { getPartnerStats } from "@/api/backend/endpoints/partner-stats/partner-stats";
import {
  GetPartnerDashboardStats200,
  GetPartnerDashboardStats500,
} from "@/api/backend/models";
import api from "@/lib/api-client";
import { ApiError } from "@/lib/api-error";

type UseGetDashboardStatsOptions = {
  restaurantId: string;
};

export function useGetDashboardStats({
  restaurantId,
}: UseGetDashboardStatsOptions) {
  return useQuery<
    GetPartnerDashboardStats200,
    ApiError<GetPartnerDashboardStats500>
  >({
    queryKey: ["partner-dashboard-stats", restaurantId],
    queryFn: async () => {
      const response =
        await getPartnerStats(api).getPartnerDashboardStats(restaurantId);

      return response.data;
    },
  });
}
