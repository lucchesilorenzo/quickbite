import { Box } from "@mui/material";

import PartnerStatsDetailsBarChart from "../common/PartnerStatsDetailsBarChart";
import PartnerStatsDetailsHeader from "../common/PartnerStatsDetailsHeader";

export default function PartnerStatsDetailsAcceptedOrders() {
  return (
    <Box component="section" sx={{ bgcolor: "white", px: 4, py: 2 }}>
      <PartnerStatsDetailsHeader title="Accepted orders" />
      <PartnerStatsDetailsBarChart
        barPrimaryColor="#007840"
        barSecondaryColor="#E0E0E0"
        barId="accepted"
        barLabel="Accepted"
      />
    </Box>
  );
}
