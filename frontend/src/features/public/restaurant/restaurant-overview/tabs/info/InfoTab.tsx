import { Box } from "@mui/material";

import RestaurantDeliveryFee from "./RestaurantDeliveryFee";
import RestaurantDeliveryTimes from "./RestaurantDeliveryTimes";
import RestaurantDescription from "./RestaurantDescription";
import RestaurantLocationDisplay from "./RestaurantLocationDisplay";

export default function InfoTab() {
  return (
    <Box>
      <RestaurantLocationDisplay />

      <Box sx={{ p: 2 }}>
        <RestaurantDescription />
        <RestaurantDeliveryTimes />
        <RestaurantDeliveryFee />
      </Box>
    </Box>
  );
}
