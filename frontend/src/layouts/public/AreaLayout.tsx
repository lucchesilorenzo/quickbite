import { Stack } from "@mui/material";
import { Outlet } from "react-router-dom";

import Footer from "@/components/Footer";
import NavigateToTopFloatingButton from "@/components/NavigateToTopFloatingButton";
import { useRestaurants } from "@/contexts/RestaurantsProvider";
import AreaHeader from "@/features/public/area/AreaHeader";

export default function AreaLayout() {
  const { isMapViewMobile } = useRestaurants();

  return (
    <Stack sx={{ minHeight: "100vh" }}>
      <AreaHeader />

      <Outlet />

      {!isMapViewMobile && <Footer />}
      {!isMapViewMobile && <NavigateToTopFloatingButton />}
    </Stack>
  );
}
