import DeliveryDiningIcon from "@mui/icons-material/DeliveryDining";
import { Box, Container, Paper, Stack, Typography } from "@mui/material";

import { useSingleRestaurant } from "@/hooks/contexts/public/useSingleRestaurant";
import { getRestaurantOpeningTime } from "@/lib/utils";

export default function RestaurantCartShippingInfo() {
  const { restaurant } = useSingleRestaurant();

  const isSameDeliveryTime =
    restaurant.delivery_time_min === restaurant.delivery_time_max;

  const openingTime = getRestaurantOpeningTime(restaurant);

  const deliveryTime = isSameDeliveryTime
    ? `${restaurant.delivery_time_min} min`
    : `${restaurant.delivery_time_min}-${restaurant.delivery_time_max} min`;

  const openingInfo = restaurant.force_close
    ? "Temporarily unavailable"
    : restaurant.is_open
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
