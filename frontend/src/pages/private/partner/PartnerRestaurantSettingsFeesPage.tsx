import { useEffect } from "react";

import DesktopSettingsFeesLayout from "@/components/partner/restaurant/settings/fees/layouts/DesktopSettingsFeesLayout";
import MobileSettingsFeesLayout from "@/components/partner/restaurant/settings/fees/layouts/MobileSettingsFeesLayout";

export default function PartnerRestaurantSettingsFeesPage() {
  useEffect(() => {
    document.title = "Fees | QuickBite";
  }, []);

  return (
    <>
      <DesktopSettingsFeesLayout />
      <MobileSettingsFeesLayout />
    </>
  );
}
