import { useEffect } from "react";

import { Container } from "@mui/material";

import HeadingBlock from "@/components/partner/restaurant/common/HeadingBlock";
import OffersContainer from "@/components/partner/restaurant/offers/OffersContainer";

export default function PartnerRestaurantOffersPage() {
  useEffect(() => {
    document.title = "Offers | QuickBite";
  }, []);

  return (
    <Container component="main" maxWidth="md" sx={{ mt: 3 }}>
      <HeadingBlock
        title="Offers"
        description="Create and manage your offers"
      />
      <OffersContainer />
    </Container>
  );
}
