import { Box } from "@mui/material";

import RestaurantCoverImage from "./RestaurantCoverImage";
import RestaurantOverview from "./restaurant-overview/RestaurantOverview";

export default function RestaurantDetails() {
  return (
    <Box component="section">
      <RestaurantCoverImage />
      <RestaurantOverview />
    </Box>
  );
}
