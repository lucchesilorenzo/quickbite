import { Alert, Box, Grid, Skeleton, Stack } from "@mui/material";

import RestaurantOfferButton from "./RestaurantOfferButton";

import CustomPagination from "@/components/common/CustomPagination";
import { useOffers } from "@/contexts/OffersProvider";

type RestaurantOffersListProps = {
  showPagination?: boolean;
};

export default function RestaurantOffersList({
  showPagination = false,
}: RestaurantOffersListProps) {
  const { data, isLoadingOffers, offersError, page, setPage } = useOffers();

  const displayedOffers = showPagination
    ? data.offers.data
    : data.offers.data.slice(0, 2);

  if (!isLoadingOffers && !offersError && displayedOffers.length === 0) {
    return null;
  }

  if (isLoadingOffers) {
    return (
      <Stack spacing={4} sx={{ mb: 2 }}>
        <Grid container spacing={2}>
          {[1, 2].map((i) => (
            <Grid key={i} size={6}>
              <Skeleton variant="rounded" animation="wave" height={40} />
            </Grid>
          ))}
        </Grid>
      </Stack>
    );
  }

  if (offersError) {
    return (
      <Box sx={{ mb: 2 }}>
        <Alert severity="error">{offersError.message}</Alert>
      </Box>
    );
  }

  return (
    <Stack spacing={4} sx={{ mb: 2 }}>
      <Grid container spacing={2}>
        {displayedOffers.map((offer) => (
          <Grid key={offer.id} size={6}>
            <RestaurantOfferButton offer={offer} />
          </Grid>
        ))}
      </Grid>

      {showPagination && (
        <Box sx={{ alignSelf: "center" }}>
          <CustomPagination
            context="offers_page"
            page={page}
            totalPages={data.offers.last_page}
            setPage={setPage}
          />
        </Box>
      )}
    </Stack>
  );
}
