import { Box, Stack } from "@mui/material";

import Review from "./Review";

import CustomPagination from "@/components/common/CustomPagination";
import { useReviews } from "@/hooks/contexts/public/useReviews";

export default function ReviewsList() {
  const { reviewsData, page, setPage } = useReviews();

  return (
    <Stack spacing={1} component="ul" sx={{ listStyle: "none", px: 2 }}>
      {reviewsData.reviews.data.map((review) => (
        <Review key={review.id} review={review} />
      ))}

      <Box sx={{ alignSelf: "center" }}>
        <CustomPagination
          context="reviews_page"
          page={page}
          totalPages={reviewsData.reviews.last_page}
          setPage={setPage}
        />
      </Box>
    </Stack>
  );
}
