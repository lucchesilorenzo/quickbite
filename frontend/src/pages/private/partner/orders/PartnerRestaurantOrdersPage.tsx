import { useEffect } from "react";

import { Container } from "@mui/material";

import HeadingBlock from "@/components/partner/restaurant/common/HeadingBlock";
import OrdersList from "@/components/partner/restaurant/orders/OrdersList";
import PartnerRestaurantOrdersProvider from "@/contexts/private/partner/PartnerOrdersProvider";

export default function PartnerRestaurantOrdersPage() {
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
