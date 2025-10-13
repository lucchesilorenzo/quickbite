import { Stack } from "@mui/material";
import RestaurantFooter from "@public/restaurant/RestaurantFooter";
import RestaurantHeader from "@public/restaurant/RestaurantHeader";
import RestaurantNavigateToTopFloatingButton from "@public/restaurant/RestaurantNavigateToTopFloatingButton";
import { Outlet } from "react-router-dom";

import MenuProvider from "@/contexts/MenuProvider";
import OffersProvider from "@/contexts/OffersProvider";
import RestaurantProvider from "@/contexts/RestaurantProvider";
import ReviewsProvider from "@/contexts/ReviewsProvider";

export default function RestaurantLayout() {
  return (
    <Stack sx={{ minHeight: "100vh" }}>
      <RestaurantProvider>
        <ReviewsProvider>
          <OffersProvider>
            <MenuProvider>
              <RestaurantHeader />

              <Outlet />

              <RestaurantFooter />
              <RestaurantNavigateToTopFloatingButton />
            </MenuProvider>
          </OffersProvider>
        </ReviewsProvider>
      </RestaurantProvider>
    </Stack>
  );
}
