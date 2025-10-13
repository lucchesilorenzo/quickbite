import { useEffect } from "react";

import { Container } from "@mui/material";
import HeadingBlock from "@partner/components/HeadingBlock";
import DeliveryTimesEditTabs from "@partner/restaurant/settings/delivery-times/edit/DeliveryTimesEditTabs";

export default function PartnerSettingsDeliveryTimesEditPage() {
  useEffect(() => {
    document.title = "Edit delivery times | QuickBite";
  }, []);

  return (
    <Container component="main" maxWidth="md" sx={{ mt: 3 }}>
      <HeadingBlock
        title="Edit delivery times"
        description="Set the delivery times for which you will receive orders"
        backButton
      />
      <DeliveryTimesEditTabs />
    </Container>
  );
}
