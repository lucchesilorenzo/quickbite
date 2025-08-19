import { Grid, Typography } from "@mui/material";

import PartnerOffersItem from "./PartnerOffersItem";

import Spinner from "@/components/common/Spinner";
import { usePartnerRestaurant } from "@/hooks/contexts/usePartnerRestaurant";
import { useGetPartnerRestaurantOffers } from "@/hooks/react-query/private/partners/restaurants/offers/useGetPartnerRestaurantOffers";

export default function PartnerOffersList() {
  const { restaurant } = usePartnerRestaurant();

  const { data: offers = [], isLoading: isLoadingOffers } =
    useGetPartnerRestaurantOffers(restaurant.id);

  if (isLoadingOffers) return <Spinner />;

  if (!offers.length) {
    return (
      <Typography variant="body1" sx={{ textAlign: "center" }}>
        Start adding your offers here.
      </Typography>
    );
  }

  return (
    <Grid container spacing={2} sx={{ mb: 2 }}>
      {offers.map((offer, i) => (
        <Grid key={offer.id} size={{ xs: 12, sm: 6 }}>
          <PartnerOffersItem
            offer={offer}
            hasSibling={i % 2 === 0 && !!offers[i + 1]}
          />
        </Grid>
      ))}
    </Grid>
  );
}
