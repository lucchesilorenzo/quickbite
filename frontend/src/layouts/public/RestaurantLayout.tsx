import { Stack } from "@mui/material";
import { Outlet } from "react-router-dom";

import RestaurantFooter from "@/components/restaurant/RestaurantFooter";
import RestaurantHeader from "@/components/restaurant/RestaurantHeader";
import RestaurantNavigateToTopFloatingButton from "@/components/restaurant/RestaurantNavigateToTopFloatingButton";
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
