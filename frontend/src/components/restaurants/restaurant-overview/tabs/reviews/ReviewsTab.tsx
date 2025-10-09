import { Box } from "@mui/material";

import RatingDisplay from "./RatingDisplay";
import ReviewsList from "./ReviewsList";

import Spinner from "@/components/common/Spinner";
import { useReviews } from "@/hooks/contexts/public/useReviews";

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
