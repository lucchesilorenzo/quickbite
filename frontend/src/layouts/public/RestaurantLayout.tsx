import { Stack } from "@mui/material";
import { Outlet } from "react-router-dom";

import RestaurantMenuProvider from "@/contexts/MenuProvider";
import RestaurantOffersProvider from "@/contexts/OffersProvider";
import SingleRestaurantProvider from "@/contexts/RestaurantProvider";
import RestaurantReviewsProvider from "@/contexts/ReviewsProvider";
import RestaurantFooter from "@/features/public/restaurant/RestaurantFooter";
import RestaurantHeader from "@/features/public/restaurant/RestaurantHeader";
import RestaurantNavigateToTopFloatingButton from "@/features/public/restaurant/RestaurantNavigateToTopFloatingButton";

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
