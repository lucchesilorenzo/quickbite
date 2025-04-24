import { Stack, Typography } from "@mui/material";

import RestaurantMinimumOrderRadioFiltersContainer from "./RestaurantMinimumOrderRadioFiltersContainer";
import RestaurantSwitchFilters from "./RestaurantSwitchFilters";

export default function RestaurantFiltersSidebar() {
  return (
    <Stack spacing={4}>
      <Typography component="span" variant="h6" sx={{ fontWeight: "700" }}>
        12 places
      </Typography>

      <RestaurantSwitchFilters />

      <RestaurantMinimumOrderRadioFiltersContainer />
    </Stack>
  );
}
