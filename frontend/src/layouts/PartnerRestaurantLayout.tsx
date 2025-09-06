import { Stack } from "@mui/material";
import { grey } from "@mui/material/colors";
import { Outlet } from "react-router-dom";

import PartnerRestaurantHeader from "@/components/partner/restaurant/PartnerRestaurantHeader";
import PartnerRestaurantProvider from "@/contexts/PartnerRestaurantProvider";

export default function PartnerRestaurantLayout() {
  return (
    <PartnerRestaurantProvider>
      <Stack sx={{ minHeight: "100vh", bgcolor: grey[100] }}>
        <PartnerRestaurantHeader />

        <Outlet />
      </Stack>
    </PartnerRestaurantProvider>
  );
}
