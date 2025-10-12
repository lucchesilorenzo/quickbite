import { useState } from "react";

import { Box, Grid, Stack, Typography } from "@mui/material";

import OffersItem from "./OffersItem";

import CustomPagination from "@/components/common/CustomPagination";
import Spinner from "@/components/common/Spinner";
import { usePartnerRestaurant } from "@/contexts/private/partner/PartnerRestaurantProvider";
import { useGetOffers } from "@/hooks/react-query/private/partner/restaurants/offers/useGetOffers";
import { partnerOffersDefaults } from "@/lib/query-defaults";

export default function OffersList() {
  const { restaurant } = usePartnerRestaurant();

  const [page, setPage] = useState(1);

  const {
    data: offersWithPagination = partnerOffersDefaults,
    isLoading: isLoadingOffers,
  } = useGetOffers(restaurant.id, page);

  if (isLoadingOffers) return <Spinner />;

  if (!offersWithPagination.data.length) {
    return (
      <Typography variant="body1" sx={{ textAlign: "center" }}>
        Start adding your offers here.
      </Typography>
    );
  }

  return (
    <Stack spacing={4}>
      <Grid container spacing={2} sx={{ mb: 2 }}>
        {offersWithPagination.data.map((offer, i) => (
          <Grid key={offer.id} size={{ xs: 12, sm: 6 }}>
            <OffersItem
              offer={offer}
              hasSibling={i % 2 === 0 && !!offersWithPagination.data[i + 1]}
            />
          </Grid>
        ))}
      </Grid>

      <Box sx={{ alignSelf: "center" }}>
        <CustomPagination
          page={page}
          totalPages={offersWithPagination.last_page}
          setPage={setPage}
        />
      </Box>
    </Stack>
  );
}
