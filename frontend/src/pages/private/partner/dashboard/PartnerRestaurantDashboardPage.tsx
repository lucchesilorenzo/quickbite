import { useEffect } from "react";

import DashboardLayoutDesktop from "@/components/partner/restaurant/dashboard/layouts/DashboardLayoutDesktop";
import DashboardLayoutMobile from "@/components/partner/restaurant/dashboard/layouts/DashboardLayoutMobile";
import PartnerRestaurantReviewsProvider from "@/contexts/private/partner/PartnerRestaurantReviewsProvider";

export default function ParterRestaurantDashboardPage() {
  useEffect(() => {
    document.title = "Dashboard | QuickBite";
  }, []);

  return (
    <PartnerRestaurantReviewsProvider>
      <DashboardLayoutDesktop />
      <DashboardLayoutMobile />
    </PartnerRestaurantReviewsProvider>
  );
}
