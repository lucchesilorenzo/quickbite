import { Box } from "@mui/material";

import PartnerStatsDetailsBarChart from "../common/PartnerStatsDetailsBarChart";
import PartnerStatsDetailsHeader from "../common/PartnerStatsDetailsHeader";

export default function PartnerStatsDetailsRejectedOrders() {
  return (
    <Box component="section" sx={{ bgcolor: "white", px: 4, py: 2 }}>
      <PartnerStatsDetailsHeader title="Rejected orders" />
      <PartnerStatsDetailsBarChart
        barPrimaryColor="#D32F2F"
        barSecondaryColor="#E0E0E0"
        barId="rejected"
        barLabel="Rejected"
      />
    </Box>
  );
}
