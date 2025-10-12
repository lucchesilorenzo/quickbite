import DeliveryDiningIcon from "@mui/icons-material/DeliveryDining";
import ScheduleIcon from "@mui/icons-material/Schedule";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import { Stack, Typography } from "@mui/material";
import { grey } from "@mui/material/colors";

import { formatCurrency } from "@/lib/utils/formatting";
import { RestaurantListItem } from "@/types/restaurant-types";

type RestaurantDeliveryInfoProps = {
  restaurant: RestaurantListItem;
};

export default function RestaurantDeliveryInfo({
  restaurant,
}: RestaurantDeliveryInfoProps) {
  const hasFreeDelivery = restaurant.delivery_fee === 0;
  const hasSameDeliveryTime =
    restaurant.delivery_time_min === restaurant.delivery_time_max;
  const deliveryTime = hasSameDeliveryTime
    ? `${restaurant.delivery_time_min} min`
    : `${restaurant.delivery_time_min}-${restaurant.delivery_time_max} min`;

  return (
    <>
      <Stack direction="row" spacing={1} sx={{ alignItems: "center" }}>
        <Stack direction="row" spacing={1} sx={{ alignItems: "center" }}>
          <ScheduleIcon fontSize="small" color="primary" />

          <Typography variant="body2" component="span" color="textPrimary">
            {deliveryTime}
          </Typography>
        </Stack>

        <Typography variant="body2" component="span" color="textSecondary">
          &bull;
        </Typography>

        <Stack
          direction="row"
          spacing={1}
          sx={{
            bgcolor: hasFreeDelivery ? grey[100] : "",
            p: 0.5,
            borderRadius: 1,
          }}
        >
          <DeliveryDiningIcon fontSize="small" color="primary" />

          <Typography variant="body2" component="span" color="textPrimary">
            {restaurant.delivery_fee > 0
              ? `${formatCurrency(restaurant.delivery_fee)} Delivery`
              : "Free delivery"}
          </Typography>
        </Stack>

        <Stack
          direction="row"
          spacing={1}
          sx={{ display: { xs: "none", sm: "flex" } }}
        >
          <Typography variant="body2" component="span" color="textSecondary">
            &bull;
          </Typography>

          <ShoppingBagIcon fontSize="small" color="primary" />

          <Typography variant="body2" component="span" color="textPrimary">
            {restaurant.min_amount > 0
              ? `Min. ${formatCurrency(restaurant.min_amount)}`
              : "No min. order"}
          </Typography>
        </Stack>
      </Stack>

      <Stack
        direction="row"
        spacing={1}
        sx={{ alignItems: "center", display: { xs: "flex", sm: "none" } }}
      >
        <ShoppingBagIcon fontSize="small" color="primary" />

        <Typography variant="body2" component="span" color="textPrimary">
          {restaurant.min_amount > 0
            ? `Min. ${formatCurrency(restaurant.min_amount)}`
            : "No min. order"}
        </Typography>
      </Stack>
    </>
  );
}
