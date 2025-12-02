import { Stack, Typography } from "@mui/material";

import RestaurantDeliveryInfo from "./RestaurantDeliveryInfo";
import RestaurantMetaInfo from "./RestaurantMetaInfo";

import { RestaurantListItem } from "@/types/restaurant.types";

type RestaurantCardTextProps = {
  restaurant: RestaurantListItem;
};

export default function RestaurantCardText({
  restaurant,
}: RestaurantCardTextProps) {
  return (
    <Stack spacing={1} sx={{ p: 2 }}>
      <Typography variant="body1" sx={{ fontWeight: 700 }} color="textPrimary">
        {restaurant.name}
      </Typography>

      <RestaurantMetaInfo restaurant={restaurant} />
      <RestaurantDeliveryInfo restaurant={restaurant} />
    </Stack>
  );
}
