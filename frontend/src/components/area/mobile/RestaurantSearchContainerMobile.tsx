import { Stack } from "@mui/material";

import RestaurantFiltersMobile from "./RestaurantFiltersDialogMobile";

import RestaurantSearch from "@/components/area/content/search-and-map/RestaurantSearch";
import RestaurantViewSwitcher from "@/components/area/content/search-and-map/RestaurantViewSwitcher";

export default function RestaurantSearchContainerMobile() {
  return (
    <Stack
      direction="row"
      spacing={2}
      sx={{
        display: { xs: "flex", lg: "none" },
        alignItems: "center",
        py: 2,
        px: 4,
      }}
    >
      <RestaurantSearch />
      <RestaurantFiltersMobile />
      <RestaurantViewSwitcher />
    </Stack>
  );
}
