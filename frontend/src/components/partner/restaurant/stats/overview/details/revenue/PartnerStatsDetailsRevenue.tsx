import { Box } from "@mui/material";

import PartnerStatsDetailsHeader from "../common/PartnerStatsDetailsHeader";
import PartnerStatsDetailsRevenueChart from "./PartnerStatsDetailsRevenueChart";

export default function PartnerStatsDetailsRevenue() {
  return (
    <Box component="section" sx={{ bgcolor: "white", px: 4, py: 2 }}>
      <PartnerStatsDetailsHeader title="Revenue" />
      <PartnerStatsDetailsRevenueChart />
    </Box>
  );
}
