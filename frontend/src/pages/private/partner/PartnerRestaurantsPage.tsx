import { useEffect } from "react";

import { Container, Typography } from "@mui/material";

import Spinner from "@/components/common/Spinner";
import PartnerRestaurantsSelection from "@/components/partner/restaurants/PartnerRestaurantsSelection";
import PartnerRestaurantsWelcome from "@/components/partner/restaurants/PartnerRestaurantsWelcome";
import { useGetPartnerRestaurants } from "@/hooks/react-query/private/partners/restaurants/restaurant/useGetPartnerRestaurants";

export default function PartnerRestaurantsPage() {
  const { data: restaurants = [], isLoading } = useGetPartnerRestaurants();

  useEffect(() => {
    document.title = "Choose your restaurant | QuickBite";
  }, []);

  return (
    <Container component="main" maxWidth="md" sx={{ py: 6 }}>
      <PartnerRestaurantsWelcome />

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
