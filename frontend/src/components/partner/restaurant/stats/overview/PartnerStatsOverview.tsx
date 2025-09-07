import { Box } from "@mui/material";

import PartnerStatsDetails from "./details/PartnerStatsDetails";
import PartnerStatsKpiCards from "./kpi/PartnerStatsKpiCards";

export default function PartnerStatsOverview() {
  return (
    <Box>
      <PartnerStatsKpiCards />
      <PartnerStatsDetails />
    </Box>
  );
}
