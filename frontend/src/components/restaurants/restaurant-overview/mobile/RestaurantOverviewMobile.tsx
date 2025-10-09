import { Box } from "@mui/material";

import RestaurantOffersList from "../../common/RestaurantOffersList";
import RestaurantHeader from "../RestaurantHeader";
import RestaurantHeaderRow from "../RestaurantHeaderRow";

import { useOffers } from "@/hooks/contexts/public/useOffers";

export default function RestaurantOverviewMobile() {
  const { offersData } = useOffers();

  return (
    <Box
      component="section"
      sx={{ display: { xs: "block", lg: "none" }, mt: 1, px: 2 }}
    >
      <RestaurantHeader />
      <RestaurantHeaderRow />
      {offersData.data.length > 0 && <RestaurantOffersList />}
    </Box>
  );
}
