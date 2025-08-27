import { Box } from "@mui/material";

import RestaurantOffersList from "../common/RestaurantOffersList";
import RestaurantHeader from "../restaurant-overview/RestaurantHeader";
import RestaurantHeaderRow from "../restaurant-overview/RestaurantHeaderRow";

import { useRestaurantOffer } from "@/hooks/contexts/useRestaurantOffer";

export default function RestaurantOverviewMobile() {
  const { offersData } = useRestaurantOffer();

  const offers = offersData?.data || [];

  return (
    <Box
      component="section"
      sx={{ display: { xs: "block", lg: "none" }, mt: 1, px: 2 }}
    >
      <RestaurantHeader />
      <RestaurantHeaderRow />
      {offers.length > 0 && <RestaurantOffersList />}
    </Box>
  );
}
