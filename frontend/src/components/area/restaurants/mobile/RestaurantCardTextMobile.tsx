import { Stack, Typography } from "@mui/material";

import RestaurantDeliveryInfo from "../RestaurantDeliveryInfo";
import RestaurantMetaInfo from "../RestaurantMetaInfo";

import { RestaurantListItem } from "@/types";

type RestaurantCardTextMobileProps = {
  restaurant: RestaurantListItem;
};

export default function RestaurantCardTextMobile({
  restaurant,
}: RestaurantCardTextMobileProps) {
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
