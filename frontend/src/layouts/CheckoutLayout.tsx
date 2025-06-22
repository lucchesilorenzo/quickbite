import { Stack } from "@mui/material";
import { Outlet } from "react-router-dom";

import Footer from "@/components/common/Footer";
import CheckoutHeader from "@/components/customer/checkout/CheckoutHeader";
import CheckoutProvider from "@/contexts/CheckoutProvider";

export default function CheckoutLayout() {
  return (
    <Stack sx={{ minHeight: "100vh" }}>
      <CheckoutHeader />

      <CheckoutProvider>
        <Outlet />
      </CheckoutProvider>

      <Footer />
    </Stack>
  );
}
