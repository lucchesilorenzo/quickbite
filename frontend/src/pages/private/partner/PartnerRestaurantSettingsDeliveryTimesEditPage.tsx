import { Container } from "@mui/material";

import PartnerRestaurantSettingsDeliveryTimeEditHeader from "@/components/partner/restaurant/settings/delivery-times/edit/PartnerRestaurantSettingsDeliveryTimeEditHeader";

export default function PartnerRestaurantSettingsDeliveryTimesEditPage() {
  return (
    <Container component="main" maxWidth="md" sx={{ mt: 4 }}>
      <PartnerRestaurantSettingsDeliveryTimeEditHeader />
    </Container>
  );
}
