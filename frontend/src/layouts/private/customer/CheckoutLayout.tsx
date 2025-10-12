import { Stack } from "@mui/material";
import { Outlet, useLocation } from "react-router-dom";

import Footer from "@/components/Footer";
import CheckoutHeader from "@/features/private/customer/checkout/CheckoutHeader";

export default function CheckoutLayout() {
  const { pathname } = useLocation();

  return (
    <Stack sx={{ minHeight: "100vh" }}>
      <CheckoutHeader />

      <Outlet />

      {pathname.includes("success") && <Footer />}
    </Stack>
  );
}
