import { Card, Divider, Stack } from "@mui/material";

import PartnerSettingsFeesFormDeliverySection from "./PartnerSettingsFeesFormDeliverySection";
import PartnerSettingsFeesFormOtherFeesSection from "./PartnerSettingsFeesFormOtherFeesSection";

export default function PartnerSettingsFeesFormCard() {
  return (
    <Card variant="outlined" sx={{ p: 2 }}>
      <Stack spacing={2}>
        <PartnerSettingsFeesFormDeliverySection />
        <Divider />
        <PartnerSettingsFeesFormOtherFeesSection />
      </Stack>
    </Card>
  );
}
