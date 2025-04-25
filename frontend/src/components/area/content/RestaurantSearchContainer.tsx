import { Stack } from "@mui/material";

import RestaurantSearch from "./RestaurantSearch";

export default function RestaurantSearchContainer() {
  return (
    <Stack direction="row" spacing={2}>
      <RestaurantSearch />
    </Stack>
  );
}
