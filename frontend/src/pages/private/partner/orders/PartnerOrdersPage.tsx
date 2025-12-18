import { useEffect } from "react";

import { Container } from "@mui/material";
import OrdersProvider from "@partner/contexts/OrdersProvider";
import OrdersList from "@partner/restaurant/orders/OrdersList";

import HeadingBlock from "@/components/common/HeadingBlock";

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
