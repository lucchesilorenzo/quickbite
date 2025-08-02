import { Box } from "@mui/material";

import PartnerDashboardStatsCard from "../stats-and-rating/stats/PartnerDashboardStatsCard";
import PartnerDashboardStatsTitle from "../stats-and-rating/stats/PartnerDashboardStatsTitle";

export default function MobilePartnerDashboardStats() {
  return (
    <Box>
      <PartnerDashboardStatsTitle />
      <PartnerDashboardStatsCard />
    </Box>
  );
}
