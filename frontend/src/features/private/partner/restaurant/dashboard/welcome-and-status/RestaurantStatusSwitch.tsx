import { useState } from "react";

import { Card, Stack, Typography } from "@mui/material";
import { useRestaurant } from "@partner/contexts/RestaurantProvider";
import { useUpdateRestaurantStatus } from "@partner/hooks/restaurants/restaurant/useUpdateRestaurantStatus";
import { format } from "date-fns";

import AntSwitch from "@/components/common/AntSwitch";

export default function RestaurantStatusSwitch() {
  const { restaurantData } = useRestaurant();

  const { mutate: updateRestaurantStatus, isPending: isUpdating } =
    useUpdateRestaurantStatus({ restaurantId: restaurantData.restaurant.id });

  const [restaurantStatus, setRestaurantStatus] = useState(
    restaurantData.restaurant.is_open,
  );

  const currentDay = format(new Date(), "EEEE").toLowerCase();

  const hasDeliveryTimes = restaurantData.restaurant.delivery_days.some(
    (deliveryDay) =>
      deliveryDay.day === currentDay &&
      deliveryDay.start_time &&
      deliveryDay.end_time,
  );

  function handleUpdateRestaurantStatus(
    e: React.ChangeEvent<HTMLInputElement>,
  ) {
    setRestaurantStatus(e.target.checked);
    updateRestaurantStatus({ force_close: !e.target.checked });
  }

  return (
    <Card variant="outlined" sx={{ width: { xs: 1, sm: 200 }, p: 2 }}>
      <Stack
        direction="row"
        sx={{ justifyContent: "space-between", alignItems: "center" }}
      >
        <Typography
          variant="body2"
          color={restaurantStatus ? "success" : "error"}
        >
          {restaurantStatus ? "Open" : "Closed"}
        </Typography>

        <AntSwitch
          disabled={!hasDeliveryTimes || isUpdating}
          checked={restaurantStatus}
          onChange={handleUpdateRestaurantStatus}
        />
      </Stack>
    </Card>
  );
}
