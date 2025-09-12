import { Stack, Typography } from "@mui/material";

import PartnerStatsDetailsAcceptedOrdersPaymentSelect from "./PartnerStatsDetailsAcceptedOrdersPaymentSelect";
import PartnerStatsDetailsAcceptedOrdersYearSelect from "./PartnerStatsDetailsAcceptedOrdersYearSelect";

export default function PartnerStatsDetailsAcceptedOrdersHeader() {
  return (
    <Stack
      direction="row"
      sx={{ alignItems: "center", justifyContent: "space-between", mb: 6 }}
    >
      <Typography variant="body1" sx={{ fontWeight: 500 }}>
        Accepted orders
      </Typography>

      <Stack direction="row" spacing={4}>
        <PartnerStatsDetailsAcceptedOrdersYearSelect />
        <PartnerStatsDetailsAcceptedOrdersPaymentSelect />
      </Stack>
    </Stack>
  );
}
