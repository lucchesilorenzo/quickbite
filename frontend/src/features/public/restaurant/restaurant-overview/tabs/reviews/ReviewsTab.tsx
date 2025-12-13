import { Alert, Box } from "@mui/material";

import RatingDisplay from "./RatingDisplay";
import ReviewsList from "./ReviewsList";

import Spinner from "@/components/common/Spinner";
import { useReviews } from "@/contexts/ReviewsProvider";

export default function ReviewsTab() {
  const { isLoadingReviews, reviewsError } = useReviews();

  if (isLoadingReviews) {
    return <Spinner />;
  }

  if (reviewsError) {
    return <Alert severity="error">{reviewsError.message}</Alert>;
  }

  return (
    <Box>
      <RatingDisplay />
      <ReviewsList />
    </Box>
  );
}
