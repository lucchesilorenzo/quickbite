import { useQuery } from "@tanstack/react-query";

import { fetchData } from "@/lib/api-client";
import { DashboardStats } from "@/types";

export function useGetPartnerRestaurantDashboardStats(restaurantId: string) {
  return useQuery({
    queryKey: ["partner-dashboard-stats", restaurantId],
    queryFn: (): Promise<DashboardStats> =>
      fetchData(`/partner/restaurants/${restaurantId}/stats/dashboard`),
  });
}
