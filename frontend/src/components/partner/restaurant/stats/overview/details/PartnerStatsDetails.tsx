import PartnerStatsDetailsAcceptedOrders from "./accepted-orders/PartnerStatsDetailsAcceptedOrders";
import PartnerStatsDetailsRevenue from "./revenue/PartnerStatsDetailsRevenue";

import { usePartnerRestaurantStats } from "@/hooks/contexts/usePartnerRestaurantStats";

export default function PartnerStatsDetails() {
  const { activeKpi } = usePartnerRestaurantStats();

  const details = {
    accepted_orders: <PartnerStatsDetailsAcceptedOrders />,
    revenue: <PartnerStatsDetailsRevenue />,
    rejected_orders: "",
    lost_revenue: "",
  };

  return details[activeKpi] ?? null;
}
