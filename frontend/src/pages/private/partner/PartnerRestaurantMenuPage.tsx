import { useEffect } from "react";

import { Container, Typography } from "@mui/material";

import PartnerMenuMainCards from "@/components/partner/restaurant/menu/PartnerMenuMainCards";

export default function PartnerRestaurantMenuPage() {
  useEffect(() => {
    document.title = "Menu | QuickBite";
  }, []);

  return (
    <Container component="main" maxWidth="md" sx={{ mt: 4 }}>
      <Typography variant="h5" sx={{ fontWeight: 600, mb: 4 }}>
        Menu
      </Typography>

      <PartnerMenuMainCards />
    </Container>
  );
}
