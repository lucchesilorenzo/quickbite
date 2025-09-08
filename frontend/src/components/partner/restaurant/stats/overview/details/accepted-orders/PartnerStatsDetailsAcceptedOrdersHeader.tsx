import { Stack, Typography } from "@mui/material";

import ParnerStatsDetailsAcceptedOrdersSelect from "./ParnerStatsDetailsAcceptedOrdersSelect";

export default function PartnerStatsDetailsAcceptedOrdersHeader() {
  return (
    <Stack
      direction="row"
      sx={{ alignItems: "center", justifyContent: "space-between", mb: 6 }}
    >
      <Typography variant="body1" sx={{ fontWeight: 500 }}>
        Accepted orders
      </Typography>

      <ParnerStatsDetailsAcceptedOrdersSelect />
    </Stack>
  );
}
