import { Box } from "@mui/material";

import RestaurantHeader from "../restaurant-overview/RestaurantHeader";
import RestaurantHeaderRow from "../restaurant-overview/RestaurantHeaderRow";

export default function RestaurantOverviewMobile() {
  return (
    <Box
      component="section"
      sx={{ display: { xs: "block", lg: "none" }, p: 2 }}
    >
      <RestaurantHeader />
      <RestaurantHeaderRow />
    </Box>
  );
}
