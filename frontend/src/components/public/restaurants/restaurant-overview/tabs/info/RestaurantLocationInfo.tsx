import { Card, CardContent, Chip, Typography } from "@mui/material";

import { getRestaurantOpeningTime, isRestaurantOpen } from "@/lib/utils";
import { RestaurantDetail } from "@/types";

type RestaurantLocationInfoProps = {
  restaurant: RestaurantDetail;
};

export default function RestaurantLocationInfo({
  restaurant,
}: RestaurantLocationInfoProps) {
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

        {isRestaurantOpen(restaurant) ? (
          <Chip label="Open" color="success" sx={{ mt: 1 }} />
        ) : (
          <Chip
            variant="outlined"
            label={`From ${getRestaurantOpeningTime(restaurant) || "Closed"}`}
            sx={{ mt: 1 }}
          />
        )}
      </CardContent>
    </Card>
  );
}
