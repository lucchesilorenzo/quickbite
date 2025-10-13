import { useEffect } from "react";

import { Container } from "@mui/material";
import StatsProvider from "@partner/contexts/StatsProvider";
import StatsHeader from "@partner/restaurant/stats/header/StatsHeader";
import StatsOverview from "@partner/restaurant/stats/overview/StatsOverview";

export default function PartnerStatsPage() {
  useEffect(() => {
    document.title = "Stats | QuickBite";
  }, []);

  return (
    <StatsProvider>
      <Container component="main" maxWidth="md" sx={{ mt: 3 }}>
        <StatsHeader />
        <StatsOverview />
      </Container>
    </StatsProvider>
  );
}
