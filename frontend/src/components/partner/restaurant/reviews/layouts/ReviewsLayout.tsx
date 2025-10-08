import { Box, Grid, Stack } from "@mui/material";

import RatingDisplayCard from "../../common/RatingDisplayCard";
import ReviewsList from "../ReviewsList";

export default function ReviewsLayout() {
  return (
    <>
      <Grid
        container
        spacing={4}
        sx={{ display: { xs: "none", md: "flex" }, my: 3 }}
      >
        <Grid size={7}>
          <ReviewsList />
        </Grid>

        <Grid size={5}>
          <RatingDisplayCard type="reviews" />
        </Grid>
      </Grid>

      <Box sx={{ display: { xs: "block", md: "none" }, my: 3 }}>
        <Stack spacing={2}>
          <RatingDisplayCard type="reviews" />
          <ReviewsList />
        </Stack>
      </Box>
    </>
  );
}
