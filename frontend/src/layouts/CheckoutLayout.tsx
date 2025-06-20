import { Stack } from "@mui/material";
import { Outlet } from "react-router-dom";

import Footer from "@/components/common/Footer";
import CheckoutHeader from "@/components/public/customer/checkout/CheckoutHeader";

export default function CheckoutLayout() {
  return (
    <Stack sx={{ minHeight: "100vh" }}>
      <CheckoutHeader />

      <Outlet />

      <Footer />
    </Stack>
  );
}
