import { useEffect } from "react";

import { Container } from "@mui/material";

import Spinner from "@/components/Spinner";
import HeadingBlock from "@/features/private/partner/components/HeadingBlock";
import { useGetRestaurants } from "@/features/private/partner/hooks/restaurants/restaurant/useGetRestaurants";
import RestaurantsSelection from "@/features/private/partner/restaurants/RestaurantsSelection";
import RestaurantsWelcome from "@/features/private/partner/restaurants/RestaurantsWelcome";

export default function PartnerRestaurantsPage() {
  const { data: restaurants = [], isLoading: isRestaurantsLoading } =
    useGetRestaurants();

  useEffect(() => {
    document.title = "Choose your restaurant | QuickBite";
  }, []);

  return (
    <Container component="main" maxWidth="md" sx={{ mt: 3 }}>
      <RestaurantsWelcome />
      <HeadingBlock title="🍔 Choose your restaurant" />

      {isRestaurantsLoading ? (
        <Spinner />
      ) : (
        <RestaurantsSelection restaurants={restaurants} />
      )}
    </Container>
  );
}
