import { useEffect } from "react";

import PartnerRestaurantReviewsProvider from "@partner/contexts/ReviewsProvider";
import DashboardLayout from "@partner/restaurant/dashboard/layouts/DashboardLayout";

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
