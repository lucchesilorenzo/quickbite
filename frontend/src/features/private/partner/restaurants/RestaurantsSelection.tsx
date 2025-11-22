import { Grid } from "@mui/material";

import RestaurantCard from "./RestaurantCard";

import { BaseRestaurant } from "@/types/restaurant-types";

type RestaurantsSelectionProps = {
  restaurants: BaseRestaurant[];
};

export default function RestaurantsSelection({
  restaurants,
}: RestaurantsSelectionProps) {
  return (
    <Grid container spacing={2} sx={{ my: 3 }}>
      {restaurants.map((restaurant) => (
        <Grid key={restaurant.id} size={{ xs: 6, sm: 4, md: 3 }}>
          <RestaurantCard restaurant={restaurant} />
        </Grid>
      ))}
    </Grid>
  );
}
