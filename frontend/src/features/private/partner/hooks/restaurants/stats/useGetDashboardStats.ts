import { DashboardStats } from "@partner/types/stat-types";
import { useQuery } from "@tanstack/react-query";

import { fetchData } from "@/lib/api-client";

export function useGetDashboardStats(restaurantId: string) {
  return useQuery({
    queryKey: ["partner-dashboard-stats", restaurantId],
    queryFn: (): Promise<DashboardStats> =>
      fetchData(`/partner/restaurants/${restaurantId}/stats/dashboard`),
  });
}
