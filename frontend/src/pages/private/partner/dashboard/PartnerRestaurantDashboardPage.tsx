import { useEffect } from "react";

import PartnerDashboardLayout from "@/components/partner/restaurant/dashboard/layouts/PartnerDashboardLayout";
import PartnerRestaurantReviewsProvider from "@/contexts/private/partner/PartnerRestaurantReviewsProvider";

export default function ParterRestaurantDashboardPage() {
  useEffect(() => {
    document.title = "Dashboard | QuickBite";
  }, []);

  return (
    <PartnerRestaurantReviewsProvider>
      <PartnerDashboardLayout />
    </PartnerRestaurantReviewsProvider>
  );
}
