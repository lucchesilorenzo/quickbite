import { Grid, Typography } from "@mui/material";

import PartnerOffersItem from "./PartnerOffersItem";

import { usePartnerRestaurant } from "@/hooks/contexts/usePartnerRestaurant";

export default function PartnerOffersList() {
  const { restaurant } = usePartnerRestaurant();

  if (!restaurant.offers.length) {
    return (
      <Typography variant="body1" sx={{ textAlign: "center" }}>
        Start adding your offers here.
      </Typography>
    );
  }

  return (
    <Grid container spacing={2} sx={{ mb: 2 }}>
      {restaurant.offers.map((offer, i) => (
        <Grid key={offer.id} size={{ xs: 12, sm: 6 }}>
          <PartnerOffersItem
            offer={offer}
            hasSibling={i % 2 === 0 && !!restaurant.offers[i + 1]}
          />
        </Grid>
      ))}
    </Grid>
  );
}
