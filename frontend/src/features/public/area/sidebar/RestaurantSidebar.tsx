import { Stack } from "@mui/material";

import RestaurantHeadingContainer from "./RestaurantHeadingContainer";
import RestaurantMinimumOrderRadioFilters from "./RestaurantMinimumOrderRadioFilters";
import RestaurantOfferFilters from "./RestaurantOfferFilters";
import RestaurantRatingFilter from "./RestaurantRatingFilter";
import RestaurantSwitchFilters from "./RestaurantSwitchFilters";

export default function RestaurantSidebar() {
  return (
    <Stack spacing={4}>
      <RestaurantHeadingContainer />
      <RestaurantSwitchFilters />
      <RestaurantMinimumOrderRadioFilters />
      <RestaurantRatingFilter />
      <RestaurantOfferFilters />
    </Stack>
  );
}
