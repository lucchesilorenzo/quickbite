import { Box } from "@mui/material";

import PartnerStatsDetailsHeader from "../common/PartnerStatsDetailsHeader";
import PartnerStatsDetailsAcceptedOrdersChart from "./PartnerStatsDetailsAcceptedOrdersChart";

export default function PartnerStatsDetailsAcceptedOrders() {
  return (
    <Box component="section" sx={{ bgcolor: "white", px: 4, py: 2 }}>
      <PartnerStatsDetailsHeader title="Accepted orders" />
      <PartnerStatsDetailsAcceptedOrdersChart />
    </Box>
  );
}
