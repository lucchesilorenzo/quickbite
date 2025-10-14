import { Stack } from "@mui/material";
import { grey } from "@mui/material/colors";
import RestaurantsHeader from "@partner/restaurants/RestaurantsHeader";
import { Outlet } from "react-router-dom";

export default function PartnerLayout() {
  return (
    <Stack sx={{ minHeight: "100vh", bgcolor: grey[100] }}>
      <RestaurantsHeader />

      <Outlet />
    </Stack>
  );
}
