import { useEffect } from "react";

import { Box, Container, Typography } from "@mui/material";

import Spinner from "@/components/common/Spinner";
import PartnerRestaurantsSelection from "@/components/partner/restaurants/PartnerRestaurantsSelection";
import { useAuth } from "@/hooks/contexts/useAuth";
import { useGetPartnerRestaurants } from "@/hooks/react-query/private/partners/useGetPartnerRestaurants";

export default function PartnerRestaurantsPage() {
  const { user } = useAuth();
  const { data: restaurants = [], isLoading } = useGetPartnerRestaurants();

  useEffect(() => {
    document.title = "Choose your restaurant | QuickBite";
  }, []);

  return (
    <Container component="main" maxWidth="md" sx={{ py: 6 }}>
      <Box sx={{ mb: 2 }}>
        <Typography variant="h5" sx={{ fontWeight: 600 }}>
          Welcome back,
        </Typography>

        <Typography variant="h5" sx={{ fontWeight: 600 }}>
          {user?.first_name} {user?.last_name}
        </Typography>
      </Box>

      <Typography variant="h6" sx={{ mb: 3 }}>
        🍔 Choose your restaurant
      </Typography>

      {isLoading ? (
        <Spinner />
      ) : (
        <PartnerRestaurantsSelection restaurants={restaurants} />
      )}
    </Container>
  );
}
