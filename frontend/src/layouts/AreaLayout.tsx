import { Stack } from "@mui/material";
import { Outlet } from "react-router-dom";

import AreaHeader from "@/components/area/AreaHeader";
import Footer from "@/components/common/Footer";
import NavigateToTopFloatingButton from "@/components/common/NavigateToTopFloatingButton";
import { useRestaurant } from "@/hooks/contexts/public/useRestaurant";

export default function AreaLayout() {
  const { isMapViewMobile } = useRestaurant();

  return (
    <Stack sx={{ minHeight: "100vh" }}>
      <AreaHeader />

      <Outlet />

      {!isMapViewMobile && <Footer />}
      {!isMapViewMobile && <NavigateToTopFloatingButton />}
    </Stack>
  );
}
