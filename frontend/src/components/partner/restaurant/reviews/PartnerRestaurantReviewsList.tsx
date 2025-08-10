import { Stack, Typography } from "@mui/material";

import PartnerRestaurantReviewsItem from "./PartnerRestaurantReviewsItem";

import { usePartnerRestaurant } from "@/hooks/contexts/usePartnerRestaurant";

export default function PartnerRestaurantReviewsList() {
  const { restaurant } = usePartnerRestaurant();

  if (!restaurant.reviews.length) {
    return (
      <Typography variant="body1" sx={{ textAlign: "center" }}>
        No reviews yet.
      </Typography>
    );
  }

  return (
    <Stack spacing={2}>
      {restaurant.reviews.map((review) => (
        <PartnerRestaurantReviewsItem key={review.id} review={review} />
      ))}
    </Stack>
  );
}
