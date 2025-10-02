import { useEffect } from "react";

import { Container } from "@mui/material";

import PartnerHeadingBlock from "@/components/partner/restaurant/common/PartnerHeadingBlock";
import PartnerSettingsDeliveryTimesTabs from "@/components/partner/restaurant/settings/delivery-times/PartnerSettingsDeliveryTimesTabs";

export default function PartnerRestaurantSettingsDeliveryTimesPage() {
  useEffect(() => {
    document.title = "Delivery times | QuickBite";
  }, []);

  return (
    <Container component="main" maxWidth="md" sx={{ mt: 4 }}>
      <PartnerHeadingBlock
        title="Delivery times"
        description="These are the delivery times for which you will receive orders"
        backButton
      />
      <PartnerSettingsDeliveryTimesTabs />
    </Container>
  );
}
