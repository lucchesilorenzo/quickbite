import { Box, Stack } from "@mui/material";

import PartnerRatingDisplayCard from "../../common/PartnerRatingDisplayCard";
import PartnerRestaurantReviewsList from "../PartnerRestaurantReviewsList";

export default function MobileReviewsLayout() {
  return (
    <Box sx={{ display: { xs: "block", md: "none" }, my: 3 }}>
      <Stack spacing={2}>
        <PartnerRatingDisplayCard type="reviews" />
        <PartnerRestaurantReviewsList />
      </Stack>
    </Box>
  );
}
