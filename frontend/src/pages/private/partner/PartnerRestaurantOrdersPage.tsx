import { useEffect } from "react";

import { Container, Typography } from "@mui/material";

import PartnerOrdersList from "@/components/partner/restaurant/orders/PartnerOrdersList";

export default function PartnerRestaurantOrdersPage() {
  useEffect(() => {
    document.title = "Offers | QuickBite";
  }, []);

  return (
    <Container component="main" maxWidth="md" sx={{ mt: 4 }}>
      <Typography variant="h5" sx={{ fontWeight: 600, mb: 4 }}>
        Orders
      </Typography>

      <PartnerOrdersList />
    </Container>
  );
}
