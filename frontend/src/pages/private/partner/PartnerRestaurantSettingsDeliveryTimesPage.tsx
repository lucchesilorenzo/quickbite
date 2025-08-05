import { useEffect } from "react";

import DesktopSettingsDeliveryTimesLayout from "@/components/partner/restaurant/settings/delivery-times/layouts/DesktopSettingsDeliveryTimesLayout";
import MobileSettingsDeliveryTimesLayout from "@/components/partner/restaurant/settings/delivery-times/layouts/MobileSettingsDeliveryTimesLayout";

export default function PartnerRestaurantSettingsDeliveryTimesPage() {
  useEffect(() => {
    document.title = "Delivery times | QuickBite";
  }, []);

  return (
    <>
      <DesktopSettingsDeliveryTimesLayout />
      <MobileSettingsDeliveryTimesLayout />
    </>
  );
}
