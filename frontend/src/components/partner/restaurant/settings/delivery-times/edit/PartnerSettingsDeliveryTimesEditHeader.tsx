import { Box, Stack, Typography } from "@mui/material";

import PartnerBackButton from "@/components/partner/restaurant/common/PartnerBackButton";

export default function PartnerSettingsDeliveryTimesEditHeader() {
  return (
    <Stack
      direction="row"
      sx={{ justifyContent: "space-between", alignItems: "center" }}
    >
      <Box>
        <PartnerBackButton />

        <Typography variant="h5" sx={{ fontWeight: 600, my: 1 }}>
          Edit delivery times
        </Typography>

        <Typography variant="body2" sx={{ mb: 2 }}>
          Set the delivery times for which you will receive orders.
        </Typography>
      </Box>
    </Stack>
  );
}
