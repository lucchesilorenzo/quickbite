import { useEffect } from "react";

import { Container } from "@mui/material";
import ReviewsProvider from "@partner/contexts/ReviewsProvider";
import ReviewsLayout from "@partner/restaurant/reviews/layouts/ReviewsLayout";

import HeadingBlock from "@/components/common/HeadingBlock";

export default function PartnerReviewsPage() {
  useEffect(() => {
    document.title = "Ratings and reviews | QuickBite";
  }, []);

  return (
    <ReviewsProvider>
      <Container component="main" maxWidth="md" sx={{ mt: 3 }}>
        <HeadingBlock title="Ratings and reviews" />
        <ReviewsLayout />
      </Container>
    </ReviewsProvider>
  );
}
