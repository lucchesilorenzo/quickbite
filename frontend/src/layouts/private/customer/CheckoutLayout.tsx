import CheckoutHeader from "@customer/checkout/CheckoutHeader";
import { Stack } from "@mui/material";
import { Outlet, useLocation } from "react-router-dom";

import Footer from "@/components/common/Footer";

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
