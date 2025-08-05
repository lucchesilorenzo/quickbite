import { Container } from "@mui/material";

import PartnerSettingsDeliveryTimesHeader from "../PartnerSettingsDeliveryTimesHeader";
import MobilePartnerSettingsDeliveryTimesTabs from "../mobile/MobilePartnerSettingsDeliveryTimesTabs";

export default function MobileSettingsDeliveryTimesLayout() {
  return (
    <Container
      component="main"
      maxWidth="md"
      sx={{ mt: 4, display: { xs: "block", md: "none" } }}
    >
      <PartnerSettingsDeliveryTimesHeader />
      <MobilePartnerSettingsDeliveryTimesTabs />
    </Container>
  );
}
