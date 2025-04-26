import { Stack } from "@mui/material";

import RestaurantSearch from "./RestaurantSearch";
import RestaurantSort from "./RestaurantSort";

export default function RestaurantSearchContainer() {
  return (
    <Stack direction="row" spacing={2}>
      <RestaurantSearch />
      <RestaurantSort />
    </Stack>
  );
}
