import { Box } from "@mui/material";

import RestaurantOffersList from "../common/RestaurantOffersList";
import RestaurantHeader from "../restaurant-overview/RestaurantHeader";
import RestaurantHeaderRow from "../restaurant-overview/RestaurantHeaderRow";

import { useSingleRestaurant } from "@/hooks/contexts/useSingleRestaurant";

export default function RestaurantOverviewMobile() {
  const { restaurant } = useSingleRestaurant();

  return (
    <Box
      component="section"
      sx={{ display: { xs: "block", lg: "none" }, mt: 1, px: 2 }}
    >
      <RestaurantHeader />
      <RestaurantHeaderRow />
      {restaurant.offers.length > 0 && <RestaurantOffersList />}
    </Box>
  );
}
