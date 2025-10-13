import { Box, Stack, Typography } from "@mui/material";
import { useReviews } from "@partner/contexts/ReviewsProvider";

import ReviewItem from "./ReviewItem";

import CustomPagination from "@/components/CustomPagination";

export default function ReviewsList() {
  const { reviewsData, page, setPage } = useReviews();

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
        <ReviewItem key={review.id} review={review} />
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
