import AcceptedOrdersSection from "./accepted-orders/AcceptedOrdersSection";
import LostRevenueSection from "./lost-revenue/LostRevenueSection";
import RejectedOrdersSection from "./rejected-orders/RejectedOrdersSection";
import RevenueSection from "./revenue/RevenueSection";

import { usePartnerRestaurantStats } from "@/hooks/contexts/private/partner/usePartnerRestaurantStats";

export default function StatsDetails() {
  const { activeKpi } = usePartnerRestaurantStats();

  const details = {
    accepted_orders: <AcceptedOrdersSection />,
    revenue: <RevenueSection />,
    rejected_orders: <RejectedOrdersSection />,
    lost_revenue: <LostRevenueSection />,
  };

  return details[activeKpi] ?? null;
}
