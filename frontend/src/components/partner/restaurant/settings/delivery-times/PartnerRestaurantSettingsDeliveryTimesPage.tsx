import { useEffect } from "react";

import DesktopSettingsDeliveryTimesLayout from "./layouts/DesktopSettingsDeliveryTimesLayout";
import MobileSettingsDeliveryTimesLayout from "./layouts/MobileSettingsDeliveryTimesLayout";

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
