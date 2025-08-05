import { Container } from "@mui/material";

import PartnerSettingsDeliveryTimesEditHeader from "@/components/partner/restaurant/settings/delivery-times/edit/PartnerSettingsDeliveryTimesEditHeader";
import PartnerSettingsDeliveryTimesEditTabs from "@/components/partner/restaurant/settings/delivery-times/edit/PartnerSettingsDeliveryTimesEditTabs";

export default function PartnerRestaurantSettingsDeliveryTimesEditPage() {
  return (
    <Container component="main" maxWidth="md" sx={{ mt: 4 }}>
      <PartnerSettingsDeliveryTimesEditHeader />
      <PartnerSettingsDeliveryTimesEditTabs />
    </Container>
  );
}
