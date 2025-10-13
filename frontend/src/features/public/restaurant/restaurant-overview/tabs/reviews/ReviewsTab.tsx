import { Box } from "@mui/material";

import RatingDisplay from "./RatingDisplay";
import ReviewsList from "./ReviewsList";

import Spinner from "@/components/Spinner";
import { useReviews } from "@/contexts/ReviewsProvider";

export default function ReviewsTab() {
  const { isLoadingReviews } = useReviews();

  if (isLoadingReviews) return <Spinner />;

  return (
    <Box>
      <RatingDisplay />
      <ReviewsList />
    </Box>
  );
}
