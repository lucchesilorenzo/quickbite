import { Stack } from "@mui/material";
import { Outlet, useLocation } from "react-router-dom";

import Footer from "@/components/Footer";
import AuthHeader from "@/features/private/partner/auth/AuthHeader";

export default function PartnerAuthLayout() {
  const { pathname } = useLocation();

  return (
    <Stack sx={{ minHeight: "100vh" }}>
      <AuthHeader />

      <Outlet />

      {pathname !== "/partner/auth/login" && <Footer />}
    </Stack>
  );
}
