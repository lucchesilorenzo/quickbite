import { Stack } from "@mui/material";
import { Outlet } from "react-router-dom";

import RestaurantFooter from "@/components/restaurants/RestaurantFooter";
import RestaurantHeader from "@/components/restaurants/RestaurantHeader";
import RestaurantNavigateToTopFloatingButton from "@/components/restaurants/RestaurantNavigateToTopFloatingButton";
import RestaurantOffersProvider from "@/contexts/RestaurantOffersProvider";
import RestaurantReviewsProvider from "@/contexts/RestaurantReviewsProvider";
import SingleRestaurantProvider from "@/contexts/SingleRestaurantProvider";

export default function RestaurantLayout() {
  return (
    <Stack sx={{ minHeight: "100vh" }}>
      <SingleRestaurantProvider>
        <RestaurantReviewsProvider>
          <RestaurantOffersProvider>
            <RestaurantHeader />

            <Outlet />

            <RestaurantFooter />
            <RestaurantNavigateToTopFloatingButton />
          </RestaurantOffersProvider>
        </RestaurantReviewsProvider>
      </SingleRestaurantProvider>
    </Stack>
  );
}
