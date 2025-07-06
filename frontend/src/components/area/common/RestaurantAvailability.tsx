import { Stack, Typography } from "@mui/material";
import { grey } from "@mui/material/colors";

import { getRestaurantOpeningTime } from "@/lib/utils";
import { RestaurantListItem } from "@/types";

type RestaurantAvailabilityProps = {
  restaurant: RestaurantListItem;
};

export default function RestaurantAvailability({
  restaurant,
}: RestaurantAvailabilityProps) {
  const openingTime = getRestaurantOpeningTime(restaurant);

  const availabilityInfo = openingTime
    ? `Delivery from ${openingTime}`
    : "Closed for delivery";

  return (
    <Stack
      direction="row"
      sx={{
        justifyContent: "center",
        bgcolor: grey[200],
        p: 1,
        borderTopLeftRadius: 4,
        borderTopRightRadius: 4,
      }}
    >
      <Typography variant="body2" component="span">
        {availabilityInfo}
      </Typography>
    </Stack>
  );
}
