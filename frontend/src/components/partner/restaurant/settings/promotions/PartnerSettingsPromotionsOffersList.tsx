import { Grid, Typography } from "@mui/material";

import PartnerSettingsPromotionsOffersItem from "./PartnerSettingsPromotionsOffersItem";

import { usePartnerRestaurant } from "@/hooks/contexts/usePartnerRestaurant";

export default function PartnerSettingsPromotionsOffersList() {
  const { restaurant } = usePartnerRestaurant();

  if (!restaurant.offers.length) {
    return (
      <Typography variant="body1" sx={{ textAlign: "center" }}>
        Start adding your promotions here.
      </Typography>
    );
  }

  return (
    <Grid container spacing={2} sx={{ mb: 2 }}>
      {restaurant.offers.map((offer) => (
        <Grid key={offer.id} size={6}>
          <PartnerSettingsPromotionsOffersItem offer={offer} />
        </Grid>
      ))}
    </Grid>
  );
}
