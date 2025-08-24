import { useEffect } from "react";

import { Container, Typography } from "@mui/material";

import DesktopReviewsLayout from "@/components/partner/restaurant/reviews/layouts/DesktopReviewsLayout";
import MobileReviewsLayout from "@/components/partner/restaurant/reviews/layouts/MobileReviewsLayout";
import PartnerRestaurantReviewsProvider from "@/contexts/PartnerRestaurantReviewsProvider";

export default function PartnerRestaurantReviewsPage() {
  useEffect(() => {
    document.title = "Ratings and reviews | QuickBite";
  }, []);

  return (
    <PartnerRestaurantReviewsProvider>
      <Container component="main" maxWidth="md" sx={{ py: 4 }}>
        <Typography variant="h5" sx={{ fontWeight: 600, mb: 4 }}>
          Ratings and reviews
        </Typography>

        <DesktopReviewsLayout />
        <MobileReviewsLayout />
      </Container>
    </PartnerRestaurantReviewsProvider>
  );
}
