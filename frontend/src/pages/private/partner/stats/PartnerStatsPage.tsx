import { useEffect } from "react";

import { Container } from "@mui/material";

import PartnerRestaurantStatsProvider from "@/features/private/partner/contexts/PartnerStatsProvider";
import StatsHeader from "@/features/private/partner/restaurant/stats/header/StatsHeader";
import StatsOverview from "@/features/private/partner/restaurant/stats/overview/StatsOverview";

export default function PartnerStatsPage() {
  useEffect(() => {
    document.title = "Stats | QuickBite";
  }, []);

  return (
    <PartnerRestaurantStatsProvider>
      <Container component="main" maxWidth="md" sx={{ mt: 3 }}>
        <StatsHeader />
        <StatsOverview />
      </Container>
    </PartnerRestaurantStatsProvider>
  );
}
