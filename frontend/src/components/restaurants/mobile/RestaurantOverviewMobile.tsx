import { Box } from "@mui/material";

import RestaurantOfferButton from "../common/RestaurantOfferButton";
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
      {restaurant.discount > 0 && restaurant.min_discount_amount > 0 && (
        <Box sx={{ mb: 2 }}>
          <RestaurantOfferButton />
        </Box>
      )}
    </Box>
  );
}
