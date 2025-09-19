import { useEffect } from "react";

import { Container } from "@mui/material";

import PartnerHeadingBlock from "@/components/partner/restaurant/common/PartnerHeadingBlock";
import DesktopReviewsLayout from "@/components/partner/restaurant/reviews/layouts/DesktopReviewsLayout";
import MobileReviewsLayout from "@/components/partner/restaurant/reviews/layouts/MobileReviewsLayout";
import PartnerRestaurantReviewsProvider from "@/contexts/PartnerRestaurantReviewsProvider";

export default function PartnerRestaurantReviewsPage() {
  useEffect(() => {
    document.title = "Ratings and reviews | QuickBite";
  }, []);

  return (
    <PartnerRestaurantReviewsProvider>
      <Container component="main" maxWidth="md" sx={{ mt: 3 }}>
        <PartnerHeadingBlock title="Ratings and reviews" />

        <DesktopReviewsLayout />
        <MobileReviewsLayout />
      </Container>
    </PartnerRestaurantReviewsProvider>
  );
}
