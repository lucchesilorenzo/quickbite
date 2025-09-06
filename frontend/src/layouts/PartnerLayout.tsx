import { Stack } from "@mui/material";
import { grey } from "@mui/material/colors";
import { Outlet } from "react-router-dom";

import PartnerHeader from "@/components/partner/restaurants/PartnerHeader";

export default function PartnerLayout() {
  return (
    <Stack sx={{ minHeight: "100vh", bgcolor: grey[100] }}>
      <PartnerHeader />

      <Outlet />
    </Stack>
  );
}
