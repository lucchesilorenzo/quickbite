import { useQuery } from "@tanstack/react-query";

import { fetchData } from "@/lib/api-client";
import { DashboardStat } from "@/types";

export function useGetPartnerRestaurantDashboardStats(restaurantId: string) {
  return useQuery({
    queryKey: ["partner-dashboard-stats"],
    queryFn: (): Promise<DashboardStat> =>
      fetchData(`/partner/restaurants/${restaurantId}/stats/dashboard`),
    initialData: { earnings_today: 0, accepted_orders: 0, rejected_orders: 0 },
  });
}
