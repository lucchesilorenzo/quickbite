import { Stack, Typography } from "@mui/material";

import PartnerStatsDetailsAcceptedOrdersPaymentSelect from "./PartnerStatsDetailsAcceptedOrdersPaymentSelect";
import PartnerStatsDetailsAcceptedOrdersYearSelect from "./PartnerStatsDetailsAcceptedOrdersYearSelect";

import { usePartnerRestaurantStats } from "@/hooks/contexts/usePartnerRestaurantStats";

export default function PartnerStatsDetailsAcceptedOrdersHeader() {
  const { range } = usePartnerRestaurantStats();

  return (
    <Stack
      direction="row"
      sx={{ alignItems: "center", justifyContent: "space-between", mb: 6 }}
    >
      <Typography variant="body1" sx={{ fontWeight: 500 }}>
        Accepted orders
      </Typography>

      <Stack direction="row" spacing={4}>
        {range !== "all" && <PartnerStatsDetailsAcceptedOrdersYearSelect />}
        <PartnerStatsDetailsAcceptedOrdersPaymentSelect />
      </Stack>
    </Stack>
  );
}
