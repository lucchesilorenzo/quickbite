import { useEffect } from "react";

import { Container } from "@mui/material";

import PartnerStatsHeader from "@/components/partner/restaurant/stats/header/PartnerStatsHeader";
import PartnerStatsOverview from "@/components/partner/restaurant/stats/overview/PartnerStatsOverview";
import PartnerRestaurantStatsProvider from "@/contexts/private/partner/PartnerRestaurantStatsProvider";

export default function PartnerRestaurantStatsPage() {
  useEffect(() => {
    document.title = "Stats | QuickBite";
  }, []);

  return (
    <PartnerRestaurantStatsProvider>
      <Container component="main" maxWidth="md" sx={{ mt: 3 }}>
        <PartnerStatsHeader />
        <PartnerStatsOverview />
      </Container>
    </PartnerRestaurantStatsProvider>
  );
}
