import { useEffect } from "react";

import DashboardLayout from "@/components/partner/restaurant/dashboard/layouts/DashboardLayout";
import PartnerRestaurantReviewsProvider from "@/contexts/private/partner/PartnerRestaurantReviewsProvider";

export default function ParterRestaurantDashboardPage() {
  useEffect(() => {
    document.title = "Dashboard | QuickBite";
  }, []);

  return (
    <PartnerRestaurantReviewsProvider>
      <DashboardLayout />
    </PartnerRestaurantReviewsProvider>
  );
}
