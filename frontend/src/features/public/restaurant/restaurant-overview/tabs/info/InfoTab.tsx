import { Box } from "@mui/material";

import RestaurantDeliveryFee from "./RestaurantDeliveryFee";
import RestaurantDeliveryTimes from "./RestaurantDeliveryTimes";
import RestaurantDescription from "./RestaurantDescription";
import RestaurantLocationDisplay from "./RestaurantLocationDisplay";

import { useRestaurant } from "@/contexts/RestaurantProvider";

export default function InfoTab() {
  const { restaurantData } = useRestaurant();

  return (
    <Box>
      <RestaurantLocationDisplay />

      <Box sx={{ p: 2 }}>
        {restaurantData.restaurant.description && <RestaurantDescription />}
        <RestaurantDeliveryTimes />
        <RestaurantDeliveryFee />
      </Box>
    </Box>
  );
}
