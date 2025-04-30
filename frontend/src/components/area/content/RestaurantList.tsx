import { Stack } from "@mui/material";

import RestaurantSearchContainer from "./RestaurantSearchContainer";

import { useRestaurant } from "@/hooks/contexts/useRestaurant";

export default function RestaurantList() {
  const { restaurants } = useRestaurant();
  console.log(restaurants);

  return (
    <Stack spacing={4}>
      <RestaurantSearchContainer />
    </Stack>
  );
}
