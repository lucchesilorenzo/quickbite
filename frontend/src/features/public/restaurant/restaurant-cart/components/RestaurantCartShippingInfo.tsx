import DeliveryDiningIcon from "@mui/icons-material/DeliveryDining";
import { Box, Container, Paper, Stack, Typography } from "@mui/material";

import { useRestaurant } from "@/contexts/RestaurantProvider";
import { getRestaurantOpeningTime } from "@/lib/utils/restaurants";

export default function RestaurantCartShippingInfo() {
  const { restaurantData } = useRestaurant();

  const isSameDeliveryTime =
    restaurantData.restaurant.min_delivery_time ===
    restaurantData.restaurant.max_delivery_time;

  const openingTime = getRestaurantOpeningTime(restaurantData.restaurant);

  const deliveryTime = isSameDeliveryTime
    ? `${restaurantData.restaurant.min_delivery_time} min`
    : `${restaurantData.restaurant.min_delivery_time}-${restaurantData.restaurant.max_delivery_time} min`;

  const openingInfo = restaurantData.restaurant.force_close
    ? "Temporarily unavailable"
    : restaurantData.restaurant.is_open
      ? deliveryTime
      : openingTime
        ? `From ${openingTime}`
        : "Closed";

  return (
    <Container maxWidth="md" sx={{ p: 2 }}>
      <Paper variant="outlined">
        <Stack
          direction="row"
          spacing={2}
          sx={{ alignItems: "center", justifyContent: "center", p: 1 }}
        >
          <DeliveryDiningIcon color="primary" />

          <Box>
            <Typography
              component="div"
              variant="body2"
              sx={{ fontWeight: 500 }}
            >
              Delivery
            </Typography>

            <Typography component="div" variant="caption">
              {openingInfo}
            </Typography>
          </Box>
        </Stack>
      </Paper>
    </Container>
  );
}
