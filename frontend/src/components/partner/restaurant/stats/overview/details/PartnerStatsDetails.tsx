import PartnerStatsDetailsAcceptedOrders from "./accepted-orders/PartnerStatsDetailsAcceptedOrders";

import { usePartnerRestaurantStats } from "@/hooks/contexts/usePartnerRestaurantStats";

export default function PartnerStatsDetails() {
  const { activeKpi } = usePartnerRestaurantStats();

  const details = {
    accepted_orders: <PartnerStatsDetailsAcceptedOrders />,
    rejected_orders: "",
    lost_revenue: "",
    revenue: "",
  };

  return details[activeKpi] ?? null;
}
