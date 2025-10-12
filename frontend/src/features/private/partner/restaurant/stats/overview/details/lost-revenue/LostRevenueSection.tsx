import { Box } from "@mui/material";

import StatsDetailsHeader from "../components/StatsDetailsHeader";
import StatsDetailsLineChart from "../components/StatsDetailsLineChart";

export default function LostRevenueSection() {
  return (
    <Box component="section" sx={{ bgcolor: "white", py: 2 }}>
      <StatsDetailsHeader title="Lost revenue" />
      <StatsDetailsLineChart
        linePrimaryColor="#D32F2F"
        lineId="lost_revenue"
        lineLabel="Lost revenue"
      />
    </Box>
  );
}
