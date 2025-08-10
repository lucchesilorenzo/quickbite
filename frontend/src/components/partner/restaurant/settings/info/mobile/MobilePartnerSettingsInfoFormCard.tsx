import { Card, Divider, Stack } from "@mui/material";

import MobilePartnerSettingsInfoAddressFormSection from "./MobilePartnerSettingsInfoAddressFormSection";
import MobilePartnerSettingsInfoMainFormSection from "./MobilePartnerSettingsInfoMainFormSection";

export default function MobilePartnerSettingsInfoFormCard() {
  return (
    <Card variant="outlined" sx={{ p: 2 }}>
      <Stack spacing={2}>
        <MobilePartnerSettingsInfoMainFormSection />
        <Divider />
        <MobilePartnerSettingsInfoAddressFormSection />
      </Stack>
    </Card>
  );
}
