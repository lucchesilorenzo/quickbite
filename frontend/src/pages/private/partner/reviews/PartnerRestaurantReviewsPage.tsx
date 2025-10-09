import { useEffect } from "react";

import { Container } from "@mui/material";

import HeadingBlock from "@/components/partner/restaurant/common/HeadingBlock";
import ReviewsLayout from "@/components/partner/restaurant/reviews/layouts/ReviewsLayout";
import PartnerRestaurantReviewsProvider from "@/contexts/private/partner/PartnerReviewsProvider";

export default function PartnerRestaurantReviewsPage() {
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
