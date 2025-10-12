import { Box } from "@mui/material";

import StatsDetailsHeader from "../common/StatsDetailsHeader";
import StatsDetailsLineChart from "../common/StatsDetailsLineChart";

export default function RevenueSection() {
  return (
    <Box component="section" sx={{ bgcolor: "white", py: 2 }}>
      <StatsDetailsHeader title="Revenue" />
      <StatsDetailsLineChart
        linePrimaryColor="#007840"
        lineId="revenue"
        lineLabel="Revenue"
      />
    </Box>
  );
}
