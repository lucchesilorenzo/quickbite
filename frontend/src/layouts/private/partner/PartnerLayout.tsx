import { Stack } from "@mui/material";
import { grey } from "@mui/material/colors";
import { Outlet } from "react-router-dom";

import RestaurantsHeader from "@/components/partner/restaurants/RestaurantsHeader";

export default function PartnerLayout() {
  return (
    <Stack sx={{ minHeight: "100vh", bgcolor: grey[100] }}>
      <RestaurantsHeader />

      <Outlet />
    </Stack>
  );
}
