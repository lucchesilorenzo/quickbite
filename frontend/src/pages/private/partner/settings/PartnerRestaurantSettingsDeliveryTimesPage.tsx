import { useEffect } from "react";

import { Container } from "@mui/material";

import HeadingBlock from "@/components/partner/restaurant/common/HeadingBlock";
import DeliveryTimesTabs from "@/components/partner/restaurant/settings/delivery-times/DeliveryTimesTabs";

export default function PartnerRestaurantSettingsDeliveryTimesPage() {
  useEffect(() => {
    document.title = "Delivery times | QuickBite";
  }, []);

  return (
    <Container component="main" maxWidth="md" sx={{ mt: 4 }}>
      <HeadingBlock
        title="Delivery times"
        description="These are the delivery times for which you will receive orders"
        backButton
      />
      <DeliveryTimesTabs />
    </Container>
  );
}
