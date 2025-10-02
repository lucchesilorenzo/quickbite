import { useEffect } from "react";

import { Container } from "@mui/material";

import PartnerHeadingBlock from "@/components/partner/restaurant/common/PartnerHeadingBlock";
import PartnerSettingsDeliveryTimesEditTabs from "@/components/partner/restaurant/settings/delivery-times/edit/PartnerSettingsDeliveryTimesEditTabs";

export default function PartnerRestaurantSettingsDeliveryTimesEditPage() {
  useEffect(() => {
    document.title = "Edit delivery times | QuickBite";
  }, []);

  return (
    <Container component="main" maxWidth="md" sx={{ mt: 3 }}>
      <PartnerHeadingBlock
        title="Edit delivery times"
        description="Set the delivery times for which you will receive orders"
        backButton
      />
      <PartnerSettingsDeliveryTimesEditTabs />
    </Container>
  );
}
