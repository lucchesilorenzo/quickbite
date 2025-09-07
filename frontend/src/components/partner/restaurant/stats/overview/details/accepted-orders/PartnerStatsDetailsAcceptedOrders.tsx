import { Box } from "@mui/material";

import PartnerStatsDetailsAcceptedOrdersHeader from "./PartnerStatsDetailsAcceptedOrdersHeader";

export default function PartnerStatsDetailsAcceptedOrders() {
  return (
    <Box component="section" sx={{ bgcolor: "white", px: 4, py: 2 }}>
      <PartnerStatsDetailsAcceptedOrdersHeader />
    </Box>
  );
}
