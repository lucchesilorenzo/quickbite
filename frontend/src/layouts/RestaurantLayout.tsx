import { Stack } from "@mui/material";
import { Outlet } from "react-router-dom";

import RestaurantFooter from "@/components/restaurants/RestaurantFooter";
import RestaurantHeader from "@/components/restaurants/RestaurantHeader";
import RestaurantNavigateToTopFloatingButton from "@/components/restaurants/RestaurantNavigateToTopFloatingButton";
import MultiCartProvider from "@/contexts/MultiCartProvider";
import SingleRestaurantProvider from "@/contexts/SingleRestaurantProvider";

export default function RestaurantLayout() {
  return (
    <Stack sx={{ minHeight: "100vh" }}>
      <SingleRestaurantProvider>
        <MultiCartProvider>
          <RestaurantHeader />

          <Outlet />

          <RestaurantFooter />
          <RestaurantNavigateToTopFloatingButton />
        </MultiCartProvider>
      </SingleRestaurantProvider>
    </Stack>
  );
}
