import { Stack } from "@mui/material";
import { Outlet, useLocation } from "react-router-dom";

import Footer from "@/components/common/Footer";
import CheckoutHeader from "@/components/customer/checkout/CheckoutHeader";
import CheckoutProvider from "@/contexts/CheckoutProvider";

export default function CheckoutLayout() {
  const { pathname } = useLocation();

  return (
    <Stack sx={{ minHeight: "100vh" }}>
      <CheckoutHeader />

      <CheckoutProvider>
        <Outlet />
      </CheckoutProvider>

      {pathname.includes("success") && <Footer />}
    </Stack>
  );
}
