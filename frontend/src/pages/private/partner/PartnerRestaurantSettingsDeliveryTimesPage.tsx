import { useEffect } from "react";

import { Container } from "@mui/material";

import PartnerSettingsDeliveryTimesHeader from "@/components/partner/restaurant/settings/delivery-times/PartnerSettingsDeliveryTimesHeader";
import PartnerSettingsDeliveryTimesTabs from "@/components/partner/restaurant/settings/delivery-times/PartnerSettingsDeliveryTimesTabs";

export default function PartnerRestaurantSettingsDeliveryTimesPage() {
  useEffect(() => {
    document.title = "Delivery times | QuickBite";
  }, []);

  return (
    <Container component="main" maxWidth="md" sx={{ mt: 4 }}>
      <PartnerSettingsDeliveryTimesHeader />
      <PartnerSettingsDeliveryTimesTabs />
    </Container>
  );
}
