import { Grid } from "@mui/material";

import RestaurantOfferButton from "./RestaurantOfferButton";

import { useSingleRestaurant } from "@/hooks/contexts/useSingleRestaurant";

export default function RestaurantOffersList() {
  const { restaurant } = useSingleRestaurant();

  return (
    <Grid container spacing={2} sx={{ mb: 2 }}>
      {restaurant.offers.map((offer) => (
        <Grid key={offer.id} size={6}>
          <RestaurantOfferButton offer={offer} />
        </Grid>
      ))}
    </Grid>
  );
}
