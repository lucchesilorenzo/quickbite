import { Stack } from "@mui/material";
import { Outlet } from "react-router-dom";

import RestaurantFooter from "@/components/public/restaurants/RestaurantFooter";
import RestaurantHeader from "@/components/public/restaurants/RestaurantHeader";
import RestaurantNavigateToTopFloatingButton from "@/components/public/restaurants/RestaurantNavigateToTopFloatingButton";
import SingleRestaurantProvider from "@/contexts/SingleRestaurantProvider";

export default function RestaurantLayout() {
  return (
    <Stack sx={{ minHeight: "100vh" }}>
      <SingleRestaurantProvider>
        <RestaurantHeader />

        <Outlet />

        <RestaurantFooter />
        <RestaurantNavigateToTopFloatingButton />
      </SingleRestaurantProvider>
    </Stack>
  );
}
