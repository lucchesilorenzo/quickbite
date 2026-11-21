import DeliveryDiningIcon from "@mui/icons-material/DeliveryDining";
import { Box, Container, Paper, Stack, Typography } from "@mui/material";

import { useRestaurant } from "@/contexts/RestaurantProvider";
import { getRestaurantOpeningTime } from "@/lib/utils/restaurants.utils";

export default function RestaurantCartShippingInfo() {
  const { restaurantData } = useRestaurant();

  const isSameDeliveryTime =
    restaurantData.data.min_delivery_time ===
    restaurantData.data.max_delivery_time;

  const openingTime = getRestaurantOpeningTime(restaurantData.data);

  const deliveryTime = isSameDeliveryTime
    ? `${restaurantData.data.min_delivery_time} min`
    : `${restaurantData.data.min_delivery_time}-${restaurantData.data.max_delivery_time} min`;

  const openingInfo = restaurantData.data.force_close
    ? "Temporarily unavailable"
    : restaurantData.data.is_open
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
