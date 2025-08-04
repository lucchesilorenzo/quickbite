import { useEffect } from "react";

import DesktopDashboardLayout from "@/components/partner/restaurant/dashboard/layouts/DesktopDashboardLayout";
import MobileDashboardLayout from "@/components/partner/restaurant/dashboard/layouts/MobileDashboardLayout";

export default function ParterRestaurantDashboardPage() {
  useEffect(() => {
    document.title = "Dashboard | QuickBite";
  }, []);

  return (
    <>
      <DesktopDashboardLayout />
      <MobileDashboardLayout />
    </>
  );
}
