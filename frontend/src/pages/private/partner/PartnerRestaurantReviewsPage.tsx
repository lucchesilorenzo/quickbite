import { Container, Typography } from "@mui/material";

import PartnerRestaurantReviewsList from "@/components/partner/restaurant/reviews/PartnerRestaurantReviewsList";

export default function PartnerRestaurantReviewsPage() {
  return (
    <Container component="main" maxWidth="md" sx={{ py: 4 }}>
      <Typography variant="h5" sx={{ fontWeight: 600, mb: 4 }}>
        Ratings and reviews
      </Typography>

      <PartnerRestaurantReviewsList />
    </Container>
  );
}
