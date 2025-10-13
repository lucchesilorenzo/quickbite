import { Box } from "@mui/material";

import StatsDetails from "./details/StatsDetails";
import StatsKpiCards from "./kpi/StatsKpiCards";

export default function StatsOverview() {
  return (
    <Box>
      <StatsKpiCards />
      <StatsDetails />
    </Box>
  );
}
