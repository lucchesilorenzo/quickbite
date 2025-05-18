import { Stack } from "@mui/material";

import RestaurantSearch from "../RestaurantSearch";
import RestaurantViewSwitcher from "../RestaurantViewSwitcher";

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
      <RestaurantViewSwitcher />
    </Stack>
  );
}
