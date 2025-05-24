import { Stack, useScrollTrigger } from "@mui/material";
import { useLocation } from "react-router-dom";

import RestaurantFiltersMobile from "./RestaurantFiltersDialogMobile";

import RestaurantSearch from "@/components/area/content/search-and-map/RestaurantSearch";
import RestaurantViewSwitcher from "@/components/area/content/search-and-map/RestaurantViewSwitcher";

export default function RestaurantSearchContainerMobile() {
  const { search } = useLocation();
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 150,
  });

  const shouldFixSearchBar = !search.includes("view_type=map") && trigger;

  return (
    <Stack
      direction="row"
      spacing={2}
      sx={{
        display: { xs: "flex", lg: "none" },
        alignItems: "center",
        py: 2,
        px: 4,
        zIndex: shouldFixSearchBar ? 1200 : "",
        position: shouldFixSearchBar ? "fixed" : "",
        bgcolor: shouldFixSearchBar ? "#fff" : "",
        boxShadow: shouldFixSearchBar ? 3 : "",
        width: 1,
        transition: "all 0.3s ease-in-out",
      }}
    >
      <RestaurantSearch />
      <RestaurantFiltersMobile />
      {!search.includes("view_type=map") && <RestaurantViewSwitcher />}
    </Stack>
  );
}
