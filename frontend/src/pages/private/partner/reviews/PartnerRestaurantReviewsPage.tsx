import { useEffect } from "react";

import { Container } from "@mui/material";

import PartnerHeadingBlock from "@/components/partner/restaurant/common/PartnerHeadingBlock";
import PartnerReviewsLayout from "@/components/partner/restaurant/reviews/layouts/PartnerReviewsLayout";
import PartnerRestaurantReviewsProvider from "@/contexts/private/partner/PartnerRestaurantReviewsProvider";

export default function PartnerRestaurantReviewsPage() {
  useEffect(() => {
    document.title = "Ratings and reviews | QuickBite";
  }, []);

  return (
    <PartnerRestaurantReviewsProvider>
      <Container component="main" maxWidth="md" sx={{ mt: 3 }}>
        <PartnerHeadingBlock title="Ratings and reviews" />
        <PartnerReviewsLayout />
      </Container>
    </PartnerRestaurantReviewsProvider>
  );
}
