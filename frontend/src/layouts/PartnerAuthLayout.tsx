import { Stack } from "@mui/material";
import { Outlet } from "react-router-dom";

import Footer from "@/components/common/Footer";
import PartnerRegisterHeader from "@/components/partner/auth/PartnerAuthHeader";

export default function PartnerAuthLayout() {
  return (
    <Stack sx={{ minHeight: "100vh" }}>
      <PartnerRegisterHeader />

      <Outlet />

      <Footer />
    </Stack>
  );
}
