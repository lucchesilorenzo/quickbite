import { useQuery } from "@tanstack/react-query";

import { getPartnerStats } from "@/api/endpoints/partner-stats/partner-stats";
import { GetPartnerDashboardStats200 } from "@/api/models";
import api from "@/lib/api-client";

type UseGetDashboardStatsOptions = {
  restaurantId: string;
};

export function useGetDashboardStats({
  restaurantId,
}: UseGetDashboardStatsOptions) {
  return useQuery<GetPartnerDashboardStats200>({
    queryKey: ["partner-dashboard-stats", restaurantId],
    queryFn: async () => {
      const response =
        await getPartnerStats(api).getPartnerDashboardStats(restaurantId);

      return response.data;
    },
  });
}
