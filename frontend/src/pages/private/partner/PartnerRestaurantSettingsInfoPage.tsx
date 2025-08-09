import { useEffect } from "react";

import DesktopSettingsInfoLayout from "@/components/partner/restaurant/settings/info/layouts/DesktopSettingsInfoLayout";
import MobileSettingsInfoLayout from "@/components/partner/restaurant/settings/info/layouts/MobileSettingsInfoLayout";

export default function PartnerRestaurantSettingsInfoPage() {
  useEffect(() => {
    document.title = "Restaurant info | QuickBite";
  }, []);

  return (
    <>
      <DesktopSettingsInfoLayout />
      <MobileSettingsInfoLayout />
    </>
  );
}
