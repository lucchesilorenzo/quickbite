import { Grid } from "@mui/material";

import PartnerRatingDisplayCard from "../../common/PartnerRatingDisplayCard";
import PartnerRestaurantReviewsList from "../PartnerRestaurantReviewsList";

export default function DesktopReviewsLayout() {
  return (
    <Grid container spacing={4} sx={{ display: { xs: "none", md: "flex" } }}>
      <Grid size={7}>
        <PartnerRestaurantReviewsList />
      </Grid>

      <Grid size={5}>
        <PartnerRatingDisplayCard type="reviews" />
      </Grid>
    </Grid>
  );
}
