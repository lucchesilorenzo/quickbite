import { useEffect } from "react";

import { Container } from "@mui/material";

import PartnerHeadingBlock from "@/components/partner/restaurant/common/PartnerHeadingBlock";
import PartnerOrdersList from "@/components/partner/restaurant/orders/PartnerOrdersList";
import PartnerRestaurantOrdersProvider from "@/contexts/PartnerRestaurantOrdersProvider";

export default function PartnerRestaurantOrdersPage() {
  useEffect(() => {
    document.title = "Orders | QuickBite";
  }, []);

  return (
    <PartnerRestaurantOrdersProvider>
      <Container component="main" maxWidth="md" sx={{ mt: 3 }}>
        <PartnerHeadingBlock title="Orders" />
        <PartnerOrdersList />
      </Container>
    </PartnerRestaurantOrdersProvider>
  );
}
