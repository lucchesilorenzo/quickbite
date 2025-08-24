import { Stack, Typography } from "@mui/material";

import PartnerRestaurantReviewsItem from "./PartnerRestaurantReviewsItem";

import { usePartnerRestaurantReviews } from "@/hooks/contexts/usePartnerRestaurantReviews";

export default function PartnerRestaurantReviewsList() {
  const { reviewsData } = usePartnerRestaurantReviews();

  if (!reviewsData.count) {
    return (
      <Typography variant="body1" sx={{ textAlign: "center" }}>
        No reviews yet.
      </Typography>
    );
  }

  return (
    <Stack spacing={2}>
      {reviewsData.reviews.map((review) => (
        <PartnerRestaurantReviewsItem key={review.id} review={review} />
      ))}
    </Stack>
  );
}
