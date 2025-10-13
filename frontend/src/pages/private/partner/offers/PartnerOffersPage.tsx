import { useEffect } from "react";

import { Container } from "@mui/material";
import HeadingBlock from "@partner/components/HeadingBlock";
import OffersContainer from "@partner/restaurant/offers/OffersContainer";

export default function PartnerOffersPage() {
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
