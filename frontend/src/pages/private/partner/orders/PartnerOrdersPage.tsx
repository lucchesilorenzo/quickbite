import { useEffect } from "react";

import { Container } from "@mui/material";

import PartnerRestaurantOrdersProvider from "@/features/private/partner/contexts/PartnerOrdersProvider";
import HeadingBlock from "@/features/private/partner/restaurant/common/HeadingBlock";
import OrdersList from "@/features/private/partner/restaurant/orders/OrdersList";

export default function PartnerOrdersPage() {
  useEffect(() => {
    document.title = "Orders | QuickBite";
  }, []);

  return (
    <PartnerRestaurantOrdersProvider>
      <Container component="main" maxWidth="md" sx={{ mt: 3 }}>
        <HeadingBlock title="Orders" />
        <OrdersList />
      </Container>
    </PartnerRestaurantOrdersProvider>
  );
}
