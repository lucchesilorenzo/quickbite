import { Box, Typography } from "@mui/material";

import { usePartnerRestaurant } from "@/features/private/partner/contexts/PartnerRestaurantProvider";

export default function RestaurantWelcome() {
  const { restaurant } = usePartnerRestaurant();

  return (
    <Box>
      <Typography variant="h5" sx={{ fontWeight: 600, mb: 1 }}>
        Welcome back
      </Typography>

      <Typography variant="h6" sx={{ fontWeight: 500 }}>
        {restaurant.name}
      </Typography>
    </Box>
  );
}
