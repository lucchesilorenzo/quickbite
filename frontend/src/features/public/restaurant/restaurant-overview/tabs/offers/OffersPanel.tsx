import { Stack, Typography } from "@mui/material";

import RestaurantOffersList from "@/features/public/restaurant/common/RestaurantOffersList";

export default function OffersPanel() {
  return (
    <Stack spacing={2} sx={{ p: 2 }}>
      <Typography variant="body2" sx={{ fontWeight: 700 }}>
        All
      </Typography>

      <RestaurantOffersList showPagination />
    </Stack>
  );
}
