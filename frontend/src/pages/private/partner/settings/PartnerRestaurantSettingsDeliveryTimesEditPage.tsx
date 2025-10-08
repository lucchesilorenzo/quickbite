import { useEffect } from "react";

import { Container } from "@mui/material";

import HeadingBlock from "@/components/partner/restaurant/common/HeadingBlock";
import DeliveryTimesEditTabs from "@/components/partner/restaurant/settings/delivery-times/edit/DeliveryTimesEditTabs";

export default function PartnerRestaurantSettingsDeliveryTimesEditPage() {
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
