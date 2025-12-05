import { useState } from "react";

import { Card, Stack, Typography } from "@mui/material";
import { useRestaurant } from "@partner/contexts/RestaurantProvider";
import { useUpdateRestaurantStatus } from "@partner/hooks/restaurants/restaurant/useUpdateRestaurantStatus";

import AntSwitch from "@/components/common/AntSwitch";

export default function RestaurantStatusSwitch() {
  const { restaurant } = useRestaurant();

  const { mutateAsync: updateRestaurantStatus } = useUpdateRestaurantStatus({
    restaurantId: restaurant.id,
  });

  const [restaurantStatus, setRestaurantStatus] = useState(restaurant.is_open);

  async function handleUpdateRestaurantStatus(
    e: React.ChangeEvent<HTMLInputElement>,
  ) {
    setRestaurantStatus(e.target.checked);
    await updateRestaurantStatus({ force_close: !e.target.checked });
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
          checked={restaurantStatus}
          onChange={handleUpdateRestaurantStatus}
        />
      </Stack>
    </Card>
  );
}
