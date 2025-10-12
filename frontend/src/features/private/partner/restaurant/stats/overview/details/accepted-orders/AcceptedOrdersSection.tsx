import { Box } from "@mui/material";

import StatsDetailsBarChart from "../components/StatsDetailsBarChart";
import StatsDetailsHeader from "../components/StatsDetailsHeader";

export default function AcceptedOrdersSection() {
  return (
    <Box component="section" sx={{ bgcolor: "white", py: 2 }}>
      <StatsDetailsHeader title="Accepted orders" />
      <StatsDetailsBarChart
        barPrimaryColor="#007840"
        barSecondaryColor="#E0E0E0"
        barId="accepted"
        barLabel="Accepted"
      />
    </Box>
  );
}
