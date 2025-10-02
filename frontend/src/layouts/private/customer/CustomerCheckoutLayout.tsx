import { Stack } from "@mui/material";
import { Outlet, useLocation } from "react-router-dom";

import Footer from "@/components/common/Footer";
import CheckoutHeader from "@/components/customer/checkout/CheckoutHeader";

export default function CustomerCheckoutLayout() {
  const { pathname } = useLocation();

  return (
    <Stack sx={{ minHeight: "100vh" }}>
      <CheckoutHeader />

      <Outlet />

      {pathname.includes("success") && <Footer />}
    </Stack>
  );
}
