import { Card, CardContent, Chip, Typography } from "@mui/material";
import { format } from "date-fns";

import { RestaurantDetail } from "@/types";

type RestaurantLocationInfoProps = {
  restaurant: RestaurantDetail;
};

export default function RestaurantLocationInfo({
  restaurant,
}: RestaurantLocationInfoProps) {
  const dayName = format(new Date(), "EEEE").toUpperCase();
  const currentTime = format(new Date(), "HH:mm");

  const isRestaurantOpen = restaurant.delivery_days.some((d) => {
    if (!d.start_time || !d.end_time) return false;

    return (
      d.day === dayName &&
      currentTime >= d.start_time &&
      currentTime <= d.end_time
    );
  });

  return (
    <Card
      variant="outlined"
      sx={{
        position: "absolute",
        left: 120,
        right: 120,
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

        {isRestaurantOpen ? (
          <Chip label="Open" color="success" sx={{ mt: 1 }} />
        ) : (
          <Chip variant="outlined" label="From 11:00" sx={{ mt: 1 }} />
        )}
      </CardContent>
    </Card>
  );
}
