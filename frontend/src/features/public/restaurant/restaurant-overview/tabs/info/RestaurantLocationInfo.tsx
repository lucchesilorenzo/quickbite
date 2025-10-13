import {
  Card,
  CardContent,
  Chip,
  Typography,
  useMediaQuery,
} from "@mui/material";

import { getRestaurantOpeningTime } from "@/lib/utils/restaurants";
import { SingleRestaurantDetail } from "@/types/restaurant-types";

type RestaurantLocationInfoProps = {
  restaurant: SingleRestaurantDetail;
};

export default function RestaurantLocationInfo({
  restaurant,
}: RestaurantLocationInfoProps) {
  const openingTime = getRestaurantOpeningTime(restaurant);

  const availability = restaurant.force_close
    ? "Temporarily closed"
    : openingTime
      ? `From ${openingTime}`
      : "Closed";

  const isMobile = useMediaQuery((theme) => theme.breakpoints.down("lg"));

  return (
    <Card
      variant="outlined"
      sx={{
        position: "absolute",
        left: isMobile ? 90 : 120,
        right: isMobile ? 90 : 120,
        bottom: 20,
        zIndex: 1000,
      }}
    >
      <CardContent sx={{ px: 2 }}>
        <Typography variant="body1" component="div" sx={{ fontWeight: 700 }}>
          Address
        </Typography>

        <Typography variant="body1" component="div">
          {restaurant.street_address}, {restaurant.building_number}
        </Typography>

        <Typography variant="body1" component="div">
          {restaurant.postcode} {restaurant.city}
        </Typography>

        {restaurant.is_open ? (
          <Chip label="Open" color="success" sx={{ mt: 1 }} />
        ) : (
          <Chip variant="outlined" label={availability} sx={{ mt: 1 }} />
        )}
      </CardContent>
    </Card>
  );
}
