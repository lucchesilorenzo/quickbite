import { useEffect } from "react";

import { Container } from "@mui/material";

import PartnerStatsHeader from "@/components/partner/restaurant/stats/header/PartnerStatsHeader";
import PartnerRestaurantStatsProvider from "@/contexts/PartnerRestaurantStatsProvider";

export default function PartnerRestaurantStatsPage() {
  useEffect(() => {
    document.title = "Stats | QuickBite";
  }, []);

  return (
    <PartnerRestaurantStatsProvider>
      <Container component="main" maxWidth="md" sx={{ py: 4 }}>
        <PartnerStatsHeader />
      </Container>
    </PartnerRestaurantStatsProvider>
  );
}
