import { Box, Stack } from "@mui/material";
import { Outlet } from "react-router-dom";

import Footer from "@/components/common/Footer";
import Header from "@/components/common/Header";
import NavigateToTopFloatingButton from "@/components/common/NavigateToTopFloatingButton";
import { useRestaurant } from "@/hooks/contexts/useRestaurant";

export default function AppLayout() {
  const { isMapViewMobile } = useRestaurant();

  return (
    <Stack sx={{ minHeight: "100vh" }}>
      <Header />

      <Box component="main">
        <Outlet />
      </Box>

      {!isMapViewMobile && <Footer />}
      {!isMapViewMobile && <NavigateToTopFloatingButton />}
    </Stack>
  );
}
