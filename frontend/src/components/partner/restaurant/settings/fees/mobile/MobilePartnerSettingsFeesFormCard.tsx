import { Card, Divider, Stack } from "@mui/material";

import MobilePartnerSettingsFeesFormDeliverySection from "./fees-form/MobilePartnerSettingsFeesFormDeliverySection";
import MobilePartnerSettingsFeesFormOtherFeesSection from "./fees-form/MobilePartnerSettingsFeesFormOtherFeesSection";

export default function MobilePartnerSettingsFeesFormCard() {
  return (
    <Card variant="outlined" sx={{ p: 2 }}>
      <Stack spacing={2}>
        <MobilePartnerSettingsFeesFormDeliverySection />
        <Divider />
        <MobilePartnerSettingsFeesFormOtherFeesSection />
      </Stack>
    </Card>
  );
}
