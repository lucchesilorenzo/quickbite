import { Stack } from "@mui/material";
import { Outlet, useLocation } from "react-router-dom";

import Footer from "@/components/common/Footer";
import PartnerRegisterHeader from "@/components/partner/auth/PartnerAuthHeader";

export default function PartnerAuthLayout() {
  const { pathname } = useLocation();

  return (
    <Stack sx={{ minHeight: "100vh" }}>
      <PartnerRegisterHeader />

      <Outlet />

      {pathname !== "/partner/auth/login" && <Footer />}
    </Stack>
  );
}
