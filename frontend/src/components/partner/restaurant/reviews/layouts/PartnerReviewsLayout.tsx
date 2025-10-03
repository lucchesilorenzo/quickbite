import { Box, Grid, Stack } from "@mui/material";

import PartnerRatingDisplayCard from "../../common/PartnerRatingDisplayCard";
import PartnerRestaurantReviewsList from "../PartnerRestaurantReviewsList";

export default function PartnerReviewsLayout() {
  return (
    <>
      <Grid
        container
        spacing={4}
        sx={{ display: { xs: "none", md: "flex" }, my: 3 }}
      >
        <Grid size={7}>
          <PartnerRestaurantReviewsList />
        </Grid>

        <Grid size={5}>
          <PartnerRatingDisplayCard type="reviews" />
        </Grid>
      </Grid>

      <Box sx={{ display: { xs: "block", md: "none" }, my: 3 }}>
        <Stack spacing={2}>
          <PartnerRatingDisplayCard type="reviews" />
          <PartnerRestaurantReviewsList />
        </Stack>
      </Box>
    </>
  );
}
