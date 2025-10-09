import { Stack } from "@mui/material";
import { Outlet } from "react-router-dom";

import AreaHeader from "@/components/area/AreaHeader";
import Footer from "@/components/common/Footer";
import NavigateToTopFloatingButton from "@/components/common/NavigateToTopFloatingButton";
import { useRestaurants } from "@/hooks/contexts/public/useRestaurants";

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
