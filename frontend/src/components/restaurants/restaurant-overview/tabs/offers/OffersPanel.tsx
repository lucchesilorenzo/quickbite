import { Stack, Typography } from "@mui/material";

import RestaurantOfferButton from "@/components/restaurants/common/RestaurantOfferButton";
import { useSingleRestaurant } from "@/hooks/contexts/useSingleRestaurant";

export default function OffersPanel() {
  const { restaurant } = useSingleRestaurant();

  return (
    <Stack spacing={2} sx={{ p: 2 }}>
      <Typography variant="body2" sx={{ fontWeight: 700 }}>
        All
      </Typography>

      {restaurant.discount_rate > 0 && restaurant.min_discount_amount > 0 && (
        <RestaurantOfferButton />
      )}
    </Stack>
  );
}
