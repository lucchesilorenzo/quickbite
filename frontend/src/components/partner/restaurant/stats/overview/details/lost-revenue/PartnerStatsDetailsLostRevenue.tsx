import { Box } from "@mui/material";

import PartnerStatsDetailsHeader from "../common/PartnerStatsDetailsHeader";
import PartnerStatsDetailsLineChart from "../common/PartnerStatsDetailsLineChart";

export default function PartnerStatsDetailsLostRevenue() {
  return (
    <Box component="section" sx={{ bgcolor: "white", py: 2 }}>
      <PartnerStatsDetailsHeader title="Lost revenue" />
      <PartnerStatsDetailsLineChart
        linePrimaryColor="#D32F2F"
        lineId="lost_revenue"
        lineLabel="Lost revenue"
      />
    </Box>
  );
}
