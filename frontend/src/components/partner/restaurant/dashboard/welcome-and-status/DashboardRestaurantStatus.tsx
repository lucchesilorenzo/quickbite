import { useState } from "react";

import { Card, Stack, Typography } from "@mui/material";

import AntSwitch from "@/components/common/AntSwitch";
import { usePartnerRestaurant } from "@/hooks/contexts/private/partner/usePartnerRestaurant";
import { useUpdatePartnerRestaurantStatus } from "@/hooks/react-query/private/partner/restaurants/restaurant/useUpdatePartnerRestaurantStatus";

export default function DashboardRestaurantStatus() {
  const { restaurant } = usePartnerRestaurant();

  const { mutateAsync: updatePartnerRestaurantStatus } =
    useUpdatePartnerRestaurantStatus(restaurant.id);

  const [restaurantStatus, setRestaurantStatus] = useState(restaurant.is_open);

  async function handleUpdateRestaurantStatus(
    e: React.ChangeEvent<HTMLInputElement>,
  ) {
    setRestaurantStatus(e.target.checked);
    await updatePartnerRestaurantStatus({ force_close: !e.target.checked });
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
