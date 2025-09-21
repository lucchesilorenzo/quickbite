import { useEffect } from "react";

import { Container } from "@mui/material";

import PartnerHeadingBlock from "@/components/partner/restaurant/common/PartnerHeadingBlock";
import PartnerMenuMainCards from "@/components/partner/restaurant/menu/PartnerMenuMainCards";

export default function PartnerRestaurantMenuPage() {
  useEffect(() => {
    document.title = "Menu | QuickBite";
  }, []);

  return (
    <Container component="main" maxWidth="md" sx={{ mt: 3 }}>
      <PartnerHeadingBlock title="Menu" />
      <PartnerMenuMainCards />
    </Container>
  );
}
