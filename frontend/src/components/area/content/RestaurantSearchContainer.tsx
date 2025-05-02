import { Stack } from "@mui/material";

import RestaurantSearch from "./RestaurantSearch";
import RestaurantSort from "./RestaurantSort";
import RestaurantViewSwitcher from "./RestaurantViewSwitcher";

export default function RestaurantSearchContainer() {
  return (
    <Stack direction="row" spacing={3} sx={{ alignItems: "center" }}>
      <RestaurantSearch />
      <RestaurantSort />
      <RestaurantViewSwitcher />
    </Stack>
  );
}
