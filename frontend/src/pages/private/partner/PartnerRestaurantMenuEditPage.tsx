import { useEffect } from "react";

import { Container } from "@mui/material";

import PartnerMenuEditHeader from "@/components/partner/restaurant/menu/edit/PartnerMenuEditHeader";
import PartnerMenuEditNavigation from "@/components/partner/restaurant/menu/edit/PartnerMenuEditNavigation";

export default function PartnerRestaurantMenuEditPage() {
  useEffect(() => {
    document.title = "Edit menu | QuickBite";
  }, []);

  return (
    <Container component="main" maxWidth="md" sx={{ mt: 4 }}>
      <PartnerMenuEditHeader />
      <PartnerMenuEditNavigation />
    </Container>
  );
}
