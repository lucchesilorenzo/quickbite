import { Stack } from "@mui/material";
import { Outlet, useLocation } from "react-router-dom";

import Footer from "@/components/common/Footer";
import AuthHeader from "@/components/partner/auth/AuthHeader";

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
