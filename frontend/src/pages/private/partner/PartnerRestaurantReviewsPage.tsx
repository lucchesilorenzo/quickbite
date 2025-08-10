import { useEffect } from "react";

import { Container, Typography } from "@mui/material";

import DesktopReviewsLayout from "@/components/partner/restaurant/reviews/layouts/DesktopReviewsLayout";
import MobileReviewsLayout from "@/components/partner/restaurant/reviews/layouts/MobileReviewsLayout";

export default function PartnerRestaurantReviewsPage() {
  useEffect(() => {
    document.title = "Ratings and reviews | QuickBite";
  }, []);

  return (
    <Container component="main" maxWidth="md" sx={{ py: 4 }}>
      <Typography variant="h5" sx={{ fontWeight: 600, mb: 4 }}>
        Ratings and reviews
      </Typography>

      <DesktopReviewsLayout />
      <MobileReviewsLayout />
    </Container>
  );
}
