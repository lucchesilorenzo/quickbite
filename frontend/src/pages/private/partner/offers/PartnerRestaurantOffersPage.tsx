import { useEffect } from "react";

import { Container } from "@mui/material";

import PartnerHeadingBlock from "@/components/partner/restaurant/common/PartnerHeadingBlock";
import PartnerOffersWrapper from "@/components/partner/restaurant/offers/PartnerOffersWrapper";

export default function PartnerRestaurantOffersPage() {
  useEffect(() => {
    document.title = "Offers | QuickBite";
  }, []);

  return (
    <Container component="main" maxWidth="md" sx={{ mt: 3 }}>
      <PartnerHeadingBlock
        title="Offers"
        description="Create and manage your offers"
      />
      <PartnerOffersWrapper />
    </Container>
  );
}
