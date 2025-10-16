import { Stack } from "@mui/material";
import AuthHeader from "@partner/auth/AuthHeader";
import { Outlet, useLocation } from "react-router-dom";

import Footer from "@/components/Footer";

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
