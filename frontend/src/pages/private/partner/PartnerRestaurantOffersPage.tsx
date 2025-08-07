import { useEffect } from "react";

import { Container } from "@mui/material";

import PartnerOffersHeader from "@/components/partner/restaurant/offers/PartnerOffersHeader";
import PartnerOffersWrapper from "@/components/partner/restaurant/offers/PartnerOffersWrapper";

export default function PartnerRestaurantOffersPage() {
  useEffect(() => {
    document.title = "Offers | QuickBite";
  }, []);

  return (
    <Container component="main" maxWidth="md" sx={{ mt: 4 }}>
      <PartnerOffersHeader />
      <PartnerOffersWrapper />
    </Container>
  );
}
