import { useState } from "react";

import { Box, Grid, Stack, Typography } from "@mui/material";
import { useGetOffers } from "@partner/hooks/restaurants/offers/useGetOffers";
import { useRestaurant } from "@private/partner/contexts/RestaurantProvider";

import OffersItem from "./OffersItem";

import CustomPagination from "@/components/CustomPagination";
import Spinner from "@/components/Spinner";
import { offersDefaults } from "@/lib/query-defaults";

export default function OffersList() {
  const { restaurant } = useRestaurant();

  const [page, setPage] = useState(1);

  const {
    data: offersWithPagination = offersDefaults,
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
