import { Card, Divider, Stack } from "@mui/material";

import FeesFormDeliverySection from "./FeesFormDeliverySection";
import FeesFormOtherFeesSection from "./FeesFormOtherFeesSection";

export default function FeesFormCard() {
  return (
    <Card variant="outlined" sx={{ p: 2 }}>
      <Stack spacing={2}>
        <FeesFormDeliverySection />
        <Divider />
        <FeesFormOtherFeesSection />
      </Stack>
    </Card>
  );
}
