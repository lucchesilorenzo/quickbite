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

  const offers = offersData?.data || [];
  const totalPages = offersData?.last_page || 1;
  const displayedOffers = showPagination ? offers : offers.slice(0, 2);

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
            totalPages={totalPages}
            setPage={setPage}
          />
        </Box>
      )}
    </Stack>
  );
}
