import { Alert, Box, CircularProgress, Stack, Typography } from "@mui/material";
import { useReviews } from "@partner/contexts/ReviewsProvider";

import ReviewItem from "./ReviewItem";

import CustomPagination from "@/components/common/CustomPagination";

export default function ReviewsList() {
  const { page, reviewsData, isLoadingReviews, reviewsError, setPage } =
    useReviews();

  if (isLoadingReviews) {
    return (
      <Stack sx={{ alignItems: "center" }}>
        <CircularProgress color="primary" size={30} />
      </Stack>
    );
  }

  if (reviewsError) {
    return <Alert severity="error">{reviewsError.message}</Alert>;
  }

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
