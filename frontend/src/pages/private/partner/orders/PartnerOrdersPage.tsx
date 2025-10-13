import { useEffect } from "react";

import { Container } from "@mui/material";
import HeadingBlock from "@partner/components/HeadingBlock";
import OrdersProvider from "@partner/contexts/OrdersProvider";
import OrdersList from "@partner/restaurant/orders/OrdersList";

export default function PartnerOrdersPage() {
  useEffect(() => {
    document.title = "Orders | QuickBite";
  }, []);

  return (
    <OrdersProvider>
      <Container component="main" maxWidth="md" sx={{ mt: 3 }}>
        <HeadingBlock title="Orders" />
        <OrdersList />
      </Container>
    </OrdersProvider>
  );
}
