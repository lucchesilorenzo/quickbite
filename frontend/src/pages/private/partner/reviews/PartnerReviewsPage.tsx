import { useEffect } from "react";

import { Container } from "@mui/material";

import PartnerRestaurantReviewsProvider from "@/features/private/partner/contexts/PartnerReviewsProvider";
import HeadingBlock from "@/features/private/partner/restaurant/common/HeadingBlock";
import ReviewsLayout from "@/features/private/partner/restaurant/reviews/layouts/ReviewsLayout";

export default function PartnerReviewsPage() {
  useEffect(() => {
    document.title = "Ratings and reviews | QuickBite";
  }, []);

  return (
    <PartnerRestaurantReviewsProvider>
      <Container component="main" maxWidth="md" sx={{ mt: 3 }}>
        <HeadingBlock title="Ratings and reviews" />
        <ReviewsLayout />
      </Container>
    </PartnerRestaurantReviewsProvider>
  );
}
