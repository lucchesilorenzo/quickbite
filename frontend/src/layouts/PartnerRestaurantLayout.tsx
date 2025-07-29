import { Stack } from "@mui/material";
import { Outlet } from "react-router-dom";

import PartnerRestaurantHeader from "@/components/partner/restaurants/PartnerRestaurantHeader";

export default function PartnerRestaurantLayout() {
  return (
    <Stack sx={{ minHeight: "100vh" }}>
      <PartnerRestaurantHeader />

      <Outlet />
    </Stack>
  );
}
