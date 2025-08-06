import { useEffect } from "react";

import { Container } from "@mui/material";

import PartnerSettingsPromotionsHeader from "@/components/partner/restaurant/settings/promotions/PartnerSettingsPromotionsHeader";
import PartnerSettingsPromotionsWrapper from "@/components/partner/restaurant/settings/promotions/PartnerSettingsPromotionsWrapper";

export default function PartnerRestaurantSettingsPromotionsPage() {
  useEffect(() => {
    document.title = "Promotions | QuickBite";
  }, []);

  return (
    <Container component="main" maxWidth="md" sx={{ mt: 4 }}>
      <PartnerSettingsPromotionsHeader />
      <PartnerSettingsPromotionsWrapper />
    </Container>
  );
}
