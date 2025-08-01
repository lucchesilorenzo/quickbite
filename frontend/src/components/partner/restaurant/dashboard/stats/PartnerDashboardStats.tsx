import { Box } from "@mui/material";

import PartnerDashboardStatsCard from "./PartnerDashboardStatsCard";
import PartnerDashboardStatsTitle from "./PartnerDashboardStatsTitle";

export default function PartnerDashboardStats() {
  return (
    <Box component="section">
      <PartnerDashboardStatsTitle />
      <PartnerDashboardStatsCard />
    </Box>
  );
}
