import { useEffect } from "react";

import DesktopSettingsDeliveryTimesLayout from "./layouts/DesktopSettingsDeliveryTimesLayout";

export default function PartnerRestaurantSettingsDeliveryTimesPage() {
  useEffect(() => {
    document.title = "Delivery times | QuickBite";
  }, []);

  return <DesktopSettingsDeliveryTimesLayout />;
}
