import { Stack, Typography } from "@mui/material";

import RestaurantMinimumOrderRadioFilters from "./RestaurantMinimumOrderRadioFilters";
import RestaurantOfferFilters from "./RestaurantOfferFilters";
import RestaurantRatingFilter from "./RestaurantRatingFilter";
import RestaurantSwitchFilters from "./RestaurantSwitchFilters";

export default function RestaurantFiltersSidebar() {
  return (
    <Stack spacing={4}>
      <Typography component="span" variant="h6" sx={{ fontWeight: "700" }}>
        12 places
      </Typography>

      <RestaurantSwitchFilters />
      <RestaurantMinimumOrderRadioFilters />
      <RestaurantRatingFilter />
      <RestaurantOfferFilters />
    </Stack>
  );
}
