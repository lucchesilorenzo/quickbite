import { Box, Stack, Typography } from "@mui/material";

import PartnerRestaurantReviewsItem from "./PartnerRestaurantReviewsItem";

import CustomPagination from "@/components/common/CustomPagination";
import { usePartnerRestaurantReviews } from "@/hooks/contexts/private/partner/usePartnerRestaurantReviews";

export default function PartnerRestaurantReviewsList() {
  const { reviewsData, page, setPage } = usePartnerRestaurantReviews();

  if (!reviewsData.count) {
    return (
      <Typography variant="body1" sx={{ textAlign: "center" }}>
        No reviews yet.
      </Typography>
    );
  }

  return (
    <Stack spacing={2}>
      {reviewsData.reviews.data.map((review) => (
        <PartnerRestaurantReviewsItem key={review.id} review={review} />
      ))}

      <Box sx={{ alignSelf: "center" }}>
        <CustomPagination
          page={page}
          totalPages={reviewsData.reviews.last_page}
          setPage={setPage}
        />
      </Box>
    </Stack>
  );
}
