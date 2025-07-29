import { Grid } from "@mui/material";

import PartnerRestaurantCard from "./PartnerRestaurantCard";

import { RestaurantDetail } from "@/types";

type PartnerRestaurantsSelectionProps = {
  restaurants: RestaurantDetail[];
};

export default function PartnerRestaurantsSelection({
  restaurants,
}: PartnerRestaurantsSelectionProps) {
  return (
    <Grid container spacing={2}>
      {restaurants.map((restaurant) => (
        <Grid key={restaurant.id} size={{ xs: 6, sm: 4, md: 3 }}>
          <PartnerRestaurantCard restaurant={restaurant} />
        </Grid>
      ))}
    </Grid>
  );
}
