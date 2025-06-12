import { Box } from "@mui/material";

import RestaurantCartMobile from "../mobile/RestaurantCartMobile";
import RestaurantDetailsMobile from "../mobile/RestaurantDetailsMobile";

export default function MobileRestaurantLayout() {
  return (
    <Box
      component="main"
      sx={{ display: { xs: "block", lg: "none" }, bgcolor: "#FCFCFC" }}
    >
      <RestaurantDetailsMobile />
      <RestaurantCartMobile />
    </Box>
  );
}
