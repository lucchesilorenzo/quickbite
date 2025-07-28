import { Stack } from "@mui/material";
import { Outlet } from "react-router-dom";

import PartnerHeader from "@/components/partner/auth/PartnerHeader";

export default function PartnerLayout() {
  return (
    <Stack sx={{ minHeight: "100vh" }}>
      <PartnerHeader />

      <Outlet />
    </Stack>
  );
}
