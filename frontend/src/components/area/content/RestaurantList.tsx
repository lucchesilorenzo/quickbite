import { Stack } from "@mui/material";

import RestaurantSearchContainer from "./RestaurantSearchContainer";

export default function RestaurantList() {
  return (
    <Stack spacing={4}>
      <RestaurantSearchContainer />
    </Stack>
  );
}
