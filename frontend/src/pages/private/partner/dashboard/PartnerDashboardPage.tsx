import { useEffect } from "react";

import PartnerRestaurantReviewsProvider from "@/features/private/partner/contexts/PartnerReviewsProvider";
import DashboardLayout from "@/features/private/partner/restaurant/dashboard/layouts/DashboardLayout";

export default function PartnerDashboardPage() {
  useEffect(() => {
    document.title = "Dashboard | QuickBite";
  }, []);

  return (
    <PartnerRestaurantReviewsProvider>
      <DashboardLayout />
    </PartnerRestaurantReviewsProvider>
  );
}
