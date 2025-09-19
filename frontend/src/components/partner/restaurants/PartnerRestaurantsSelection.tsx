import { Grid } from "@mui/material";

import PartnerRestaurantCard from "./PartnerRestaurantCard";

import { PartnerRestaurantBase } from "@/types";

type PartnerRestaurantsSelectionProps = {
  restaurants: PartnerRestaurantBase[];
};

export default function PartnerRestaurantsSelection({
  restaurants,
}: PartnerRestaurantsSelectionProps) {
  return (
    <Grid container spacing={2} sx={{ my: 3 }}>
      {restaurants.map((restaurant) => (
        <Grid key={restaurant.id} size={{ xs: 6, sm: 4, md: 3 }}>
          <PartnerRestaurantCard restaurant={restaurant} />
        </Grid>
      ))}
    </Grid>
  );
}
