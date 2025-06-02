import { Stack } from "@mui/material";

import Review from "./Review";

import { useSingleRestaurant } from "@/hooks/contexts/useSingleRestaurant";

export default function ReviewsList() {
  const { restaurant } = useSingleRestaurant();

  return (
    <Stack spacing={1} component="ul" sx={{ listStyle: "none", px: 2 }}>
      {restaurant.reviews.map((review) => (
        <Review key={review.id} review={review} />
      ))}
    </Stack>
  );
}
