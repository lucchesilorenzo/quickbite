import { Stack } from "@mui/material";
import { Outlet } from "react-router-dom";

import PartnerRestaurantHeader from "@/components/partner/restaurant/PartnerRestaurantHeader";
import PartnerRestaurantProvider from "@/contexts/PartnerRestaurantProvider";

export default function PartnerRestaurantLayout() {
  return (
    <PartnerRestaurantProvider>
      <Stack sx={{ minHeight: "100vh" }}>
        <PartnerRestaurantHeader />

        <Outlet />
      </Stack>
    </PartnerRestaurantProvider>
  );
}
