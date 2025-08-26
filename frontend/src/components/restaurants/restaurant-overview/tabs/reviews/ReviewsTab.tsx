import { Box } from "@mui/material";

import RatingDisplay from "./RatingDisplay";
import ReviewsList from "./ReviewsList";

import Spinner from "@/components/common/Spinner";
import { useRestaurantReview } from "@/hooks/contexts/useRestaurantReview";

export default function ReviewsTab() {
  const { isLoadingReviews } = useRestaurantReview();

  if (isLoadingReviews) return <Spinner />;

  return (
    <Box>
      <RatingDisplay />
      <ReviewsList />
    </Box>
  );
}
