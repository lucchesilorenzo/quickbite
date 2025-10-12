import { Card, Divider, Stack } from "@mui/material";

import InfoAddressFormSection from "./InfoAddressFormSection";
import InfoMainFormSection from "./InfoMainFormSection";

export default function InfoFormCard() {
  return (
    <Card variant="outlined" sx={{ p: 2 }}>
      <Stack spacing={2}>
        <InfoMainFormSection />
        <Divider />
        <InfoAddressFormSection />
      </Stack>
    </Card>
  );
}
