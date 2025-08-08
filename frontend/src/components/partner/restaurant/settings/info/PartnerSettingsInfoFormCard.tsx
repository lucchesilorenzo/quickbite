import { Card, Stack } from "@mui/material";

import PartnerSettingsInfoMainFormSection from "./PartnerSettingsInfoMainFormSection";

export default function PartnerSettingsInfoFormCard() {
  return (
    <Card variant="outlined" sx={{ p: 2 }}>
      <Stack spacing={2}>
        <PartnerSettingsInfoMainFormSection />
      </Stack>
    </Card>
  );
}
