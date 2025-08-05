import { Container } from "@mui/material";

import PartnerSettingsDeliveryTimesHeader from "../PartnerSettingsDeliveryTimesHeader";
import PartnerSettingsDeliveryTimesTabs from "../PartnerSettingsDeliveryTimesTabs";

export default function DesktopSettingsDeliveryTimesLayout() {
  return (
    <Container
      component="main"
      maxWidth="md"
      sx={{ mt: 4, display: { xs: "none", md: "block" } }}
    >
      <PartnerSettingsDeliveryTimesHeader />
      <PartnerSettingsDeliveryTimesTabs />
    </Container>
  );
}
