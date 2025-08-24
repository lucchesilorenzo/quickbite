import { useState } from "react";

import { Box, Grid, Stack, Typography } from "@mui/material";

import PartnerOffersItem from "./PartnerOffersItem";

import CustomPagination from "@/components/common/CustomPagination";
import Spinner from "@/components/common/Spinner";
import { usePartnerRestaurant } from "@/hooks/contexts/usePartnerRestaurant";
import { useGetPartnerRestaurantOffers } from "@/hooks/react-query/private/partners/restaurants/offers/useGetPartnerRestaurantOffers";

export default function PartnerOffersList() {
  const { restaurant } = usePartnerRestaurant();

  const [page, setPage] = useState(1);

  const { data: offersWithPagination, isLoading: isLoadingOffers } =
    useGetPartnerRestaurantOffers(restaurant.id, page);

  const offers = offersWithPagination?.data;
  const totalPages = offersWithPagination?.last_page || 1;

  if (isLoadingOffers) return <Spinner />;

  if (!offers?.length) {
    return (
      <Typography variant="body1" sx={{ textAlign: "center" }}>
        Start adding your offers here.
      </Typography>
    );
  }

  return (
    <Stack spacing={4}>
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

      <Box sx={{ alignSelf: "center" }}>
        <CustomPagination
          page={page}
          totalPages={totalPages}
          setPage={setPage}
        />
      </Box>
    </Stack>
  );
}
