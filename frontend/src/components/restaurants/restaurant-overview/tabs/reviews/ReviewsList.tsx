import { Box, Stack } from "@mui/material";

import Review from "./Review";

import CustomPagination from "@/components/common/CustomPagination";
import { useRestaurantReview } from "@/hooks/contexts/useRestaurantReview";

export default function ReviewsList() {
  const { reviewsData, page, setPage } = useRestaurantReview();

  const reviews = reviewsData?.reviews.data || [];
  const totalPages = reviewsData?.reviews.last_page || 1;

  return (
    <Stack spacing={1} component="ul" sx={{ listStyle: "none", px: 2 }}>
      {reviews.map((review) => (
        <Review key={review.id} review={review} />
      ))}

      <Box sx={{ alignSelf: "center" }}>
        <CustomPagination
          context="reviewsPage"
          page={page}
          totalPages={totalPages}
          setPage={setPage}
        />
      </Box>
    </Stack>
  );
}
