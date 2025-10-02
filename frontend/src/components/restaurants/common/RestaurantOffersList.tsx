import { Box, Grid, Stack } from "@mui/material";

import RestaurantOfferButton from "./RestaurantOfferButton";

import CustomPagination from "@/components/common/CustomPagination";
import { useRestaurantOffer } from "@/hooks/contexts/useRestaurantOffer";

type RestaurantOffersListProps = {
  showPagination?: boolean;
};

export default function RestaurantOffersList({
  showPagination = false,
}: RestaurantOffersListProps) {
  const { offersData, page, setPage } = useRestaurantOffer();

  const displayedOffers = showPagination
    ? offersData.data
    : offersData.data.slice(0, 2);

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
            totalPages={offersData.last_page}
            setPage={setPage}
          />
        </Box>
      )}
    </Stack>
  );
}
