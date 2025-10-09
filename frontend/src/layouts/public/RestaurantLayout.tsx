import { Stack } from "@mui/material";
import { Outlet } from "react-router-dom";

import RestaurantFooter from "@/components/restaurants/RestaurantFooter";
import RestaurantHeader from "@/components/restaurants/RestaurantHeader";
import RestaurantNavigateToTopFloatingButton from "@/components/restaurants/RestaurantNavigateToTopFloatingButton";
import RestaurantMenuProvider from "@/contexts/public/MenuProvider";
import RestaurantOffersProvider from "@/contexts/public/OffersProvider";
import SingleRestaurantProvider from "@/contexts/public/RestaurantProvider";
import RestaurantReviewsProvider from "@/contexts/public/ReviewsProvider";

export default function RestaurantLayout() {
  return (
    <Stack sx={{ minHeight: "100vh" }}>
      <SingleRestaurantProvider>
        <RestaurantReviewsProvider>
          <RestaurantOffersProvider>
            <RestaurantMenuProvider>
              <RestaurantHeader />

              <Outlet />

              <RestaurantFooter />
              <RestaurantNavigateToTopFloatingButton />
            </RestaurantMenuProvider>
          </RestaurantOffersProvider>
        </RestaurantReviewsProvider>
      </SingleRestaurantProvider>
    </Stack>
  );
}
