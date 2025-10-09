import { useEffect } from "react";

import { Container } from "@mui/material";

import StatsHeader from "@/components/partner/restaurant/stats/header/StatsHeader";
import StatsOverview from "@/components/partner/restaurant/stats/overview/StatsOverview";
import PartnerRestaurantStatsProvider from "@/contexts/private/partner/PartnerStatsProvider";

export default function PartnerRestaurantStatsPage() {
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
