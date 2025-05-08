import { Box, Stack } from "@mui/material";
import { Outlet } from "react-router-dom";

import Footer from "@/components/common/Footer";
import Header from "@/components/common/Header";
import NavigateToTopFloatingButton from "@/components/common/NavigateToTopFloatingButton";
import CategoryFiltersProvider from "@/contexts/CategoryFiltersProvider";
import RestaurantProvider from "@/contexts/RestaurantProvider";

export default function AppLayout() {
  return (
    <Stack sx={{ minHeight: "100vh" }}>
      <CategoryFiltersProvider>
        <RestaurantProvider>
          <Header />

          <Box component="main">
            <Outlet />
          </Box>

          <Footer />

          <NavigateToTopFloatingButton />
        </RestaurantProvider>
      </CategoryFiltersProvider>
    </Stack>
  );
}
