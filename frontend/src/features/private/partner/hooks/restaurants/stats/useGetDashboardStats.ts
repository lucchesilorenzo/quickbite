import { GetDashboardStatsResponse } from "@partner/types/stats/stats.api.types";
import { useQuery } from "@tanstack/react-query";

import { fetchData } from "@/lib/api-client";

type UseGetDashboardStats = {
  restaurantId: string;
};

export function useGetDashboardStats({ restaurantId }: UseGetDashboardStats) {
  return useQuery<GetDashboardStatsResponse>({
    queryKey: ["partner-dashboard-stats", restaurantId],
    queryFn: () =>
      fetchData(`/partner/restaurants/${restaurantId}/stats/dashboard`),
  });
}
