import { useQuery } from "@tanstack/react-query";

import { fetchData } from "@/lib/api-client";
import { DashboardStats } from "@/types";

export function useGetPartnerRestaurantDashboardStats(restaurantId: string) {
  return useQuery({
    queryKey: ["partner-dashboard-stats"],
    queryFn: (): Promise<DashboardStats> =>
      fetchData(`/partner/restaurants/${restaurantId}/stats/dashboard`),
    initialData: { earnings_today: 0, accepted_orders: 0, rejected_orders: 0 },
  });
}
