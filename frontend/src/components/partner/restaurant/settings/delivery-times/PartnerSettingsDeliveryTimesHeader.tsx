import { Box, Stack, Typography } from "@mui/material";

import PartnerBackButton from "../../common/PartnerBackButton";

export default function PartnerSettingsDeliveryTimesHeader() {
  return (
    <Stack
      direction="row"
      sx={{ justifyContent: "space-between", alignItems: "center" }}
    >
      <Box>
        <PartnerBackButton />

        <Typography variant="h5" sx={{ fontWeight: 600, my: 1 }}>
          Delivery times
        </Typography>

        <Typography variant="body2" sx={{ mb: 2 }}>
          These are the delivery times for which you will receive orders.
        </Typography>
      </Box>
    </Stack>
  );
}
