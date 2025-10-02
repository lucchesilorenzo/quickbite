import { useEffect } from "react";

import DesktopDashboardLayout from "@/components/partner/restaurant/dashboard/layouts/DesktopDashboardLayout";
import MobileDashboardLayout from "@/components/partner/restaurant/dashboard/layouts/MobileDashboardLayout";
import PartnerRestaurantReviewsProvider from "@/contexts/PartnerRestaurantReviewsProvider";

export default function ParterRestaurantDashboardPage() {
  useEffect(() => {
    document.title = "Dashboard | QuickBite";
  }, []);

  return (
    <PartnerRestaurantReviewsProvider>
      <DesktopDashboardLayout />
      <MobileDashboardLayout />
    </PartnerRestaurantReviewsProvider>
  );
}
