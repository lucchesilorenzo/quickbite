import { Card, Divider, Stack } from "@mui/material";

import PartnerSettingsInfoAddressFormSection from "./PartnerSettingsInfoAddressFormSection";
import PartnerSettingsInfoMainFormSection from "./PartnerSettingsInfoMainFormSection";

export default function PartnerSettingsInfoFormCard() {
  return (
    <Card variant="outlined" sx={{ p: 2 }}>
      <Stack spacing={2}>
        <PartnerSettingsInfoMainFormSection />
        <Divider />
        <PartnerSettingsInfoAddressFormSection />
      </Stack>
    </Card>
  );
}
