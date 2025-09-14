import PartnerStatsDetailsAcceptedOrders from "./accepted-orders/PartnerStatsDetailsAcceptedOrders";
import PartnerStatsDetailsRejectedOrders from "./rejected-orders/PartnerStatsDetailsRejectedOrders";
import PartnerStatsDetailsRevenue from "./revenue/PartnerStatsDetailsRevenue";

import { usePartnerRestaurantStats } from "@/hooks/contexts/usePartnerRestaurantStats";

export default function PartnerStatsDetails() {
  const { activeKpi } = usePartnerRestaurantStats();

  const details = {
    accepted_orders: <PartnerStatsDetailsAcceptedOrders />,
    revenue: <PartnerStatsDetailsRevenue />,
    rejected_orders: <PartnerStatsDetailsRejectedOrders />,
    lost_revenue: "",
  };

  return details[activeKpi] ?? null;
}
