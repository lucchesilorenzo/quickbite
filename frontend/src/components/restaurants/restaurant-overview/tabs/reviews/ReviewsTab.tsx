import { Box } from "@mui/material";

import RatingDisplay from "./RatingDisplay";
import ReviewsList from "./ReviewsList";

export default function ReviewsTab() {
  return (
    <Box>
      <RatingDisplay />
      <ReviewsList />
    </Box>
  );
}
