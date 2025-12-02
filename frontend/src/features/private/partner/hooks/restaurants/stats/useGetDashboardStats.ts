import { useQuery } from "@tanstack/react-query";

import { DashboardStats } from "@/features/private/partner/types/stat.types";
import { fetchData } from "@/lib/api-client";

export function useGetDashboardStats(restaurantId: string) {
  return useQuery({
    queryKey: ["partner-dashboard-stats", restaurantId],
    queryFn: (): Promise<DashboardStats> =>
      fetchData(`/partner/restaurants/${restaurantId}/stats/dashboard`),
  });
}
