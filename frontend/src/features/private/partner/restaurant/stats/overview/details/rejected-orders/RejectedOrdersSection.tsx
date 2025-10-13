import { Box } from "@mui/material";

import StatsDetailsBarChart from "../components/StatsDetailsBarChart";
import StatsDetailsHeader from "../components/StatsDetailsHeader";

export default function RejectedOrdersSection() {
  return (
    <Box component="section" sx={{ bgcolor: "white", py: 2 }}>
      <StatsDetailsHeader title="Rejected orders" />
      <StatsDetailsBarChart
        barPrimaryColor="#D32F2F"
        barSecondaryColor="#E0E0E0"
        barId="rejected"
        barLabel="Rejected"
      />
    </Box>
  );
}
