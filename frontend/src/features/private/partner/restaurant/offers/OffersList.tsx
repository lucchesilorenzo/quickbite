import { useState } from "react";

import { Box, Grid, Stack, Typography } from "@mui/material";
import { useRestaurant } from "@partner/contexts/RestaurantProvider";
import { useGetOffers } from "@partner/hooks/restaurants/offers/useGetOffers";

import OffersItem from "./OffersItem";

import CustomPagination from "@/components/common/CustomPagination";
import FullPageErrorMessage from "@/components/common/FullPageErrorMessage";
import Spinner from "@/components/common/Spinner";
import { offersDefaults } from "@/lib/query-defaults";

export default function OffersList() {
  const { restaurant } = useRestaurant();

  const [page, setPage] = useState(1);

  const {
    data: offersData = { success: false, message: "", offers: offersDefaults },
    isLoading: isLoadingOffers,
    error: offersError,
  } = useGetOffers({ restaurantId: restaurant.id, page });

  if (isLoadingOffers) {
    return <Spinner />;
  }

  if (offersError) {
    return <FullPageErrorMessage message={offersError.message} />;
  }

  if (!offersData.offers.data.length) {
    return (
      <Typography variant="body1" sx={{ textAlign: "center" }}>
        Start adding your offers here.
      </Typography>
    );
  }

  return (
    <Stack spacing={4}>
      <Grid container spacing={2} sx={{ mb: 2 }}>
        {offersData.offers.data.map((offer, i) => (
          <Grid key={offer.id} size={{ xs: 12, sm: 6 }}>
            <OffersItem
              offer={offer}
              hasSibling={i % 2 === 0 && !!offersData.offers.data[i + 1]}
            />
          </Grid>
        ))}
      </Grid>

      <Box sx={{ alignSelf: "center" }}>
        <CustomPagination
          page={page}
          totalPages={offersData.offers.last_page}
          setPage={setPage}
        />
      </Box>
    </Stack>
  );
}
