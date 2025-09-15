import { Box } from "@mui/material";

import PartnerStatsDetailsHeader from "../common/PartnerStatsDetailsHeader";
import PartnerStatsDetailsLineChart from "../common/PartnerStatsDetailsLineChart";

export default function PartnerStatsDetailsRevenue() {
  return (
    <Box component="section" sx={{ bgcolor: "white", py: 2 }}>
      <PartnerStatsDetailsHeader title="Revenue" />
      <PartnerStatsDetailsLineChart
        linePrimaryColor="#007840"
        lineId="revenue"
        lineLabel="Revenue"
      />
    </Box>
  );
}
