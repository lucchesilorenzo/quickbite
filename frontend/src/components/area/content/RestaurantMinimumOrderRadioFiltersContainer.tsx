import { Box } from "@mui/material";

import RestaurantMinimumOrderRadioFilters from "./RestaurantMinimumOrderRadioFilters";
import RestaurantMinimumOrderRadioFiltersHeading from "./RestaurantMinimumOrderRadioFiltersHeading";

export default function RestaurantMinimumOrderRadioFiltersContainer() {
  return (
    <Box>
      <RestaurantMinimumOrderRadioFiltersHeading />
      <RestaurantMinimumOrderRadioFilters />
    </Box>
  );
}
