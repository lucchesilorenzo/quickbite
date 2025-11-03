import { useEffect } from "react";

import { Container } from "@mui/material";
import HeadingBlock from "@partner/components/HeadingBlock";
import { useGetRestaurants } from "@partner/hooks/restaurants/restaurant/useGetRestaurants";
import RestaurantsSelection from "@partner/restaurants/RestaurantsSelection";
import RestaurantsWelcome from "@partner/restaurants/RestaurantsWelcome";

import Spinner from "@/components/common/Spinner";

export default function PartnerRestaurantsPage() {
  const { data: restaurants = [], isLoading: restaurantsLoading } =
    useGetRestaurants();

  useEffect(() => {
    document.title = "Choose your restaurant | QuickBite";
  }, []);

  return (
    <Container component="main" maxWidth="md" sx={{ mt: 3 }}>
      <RestaurantsWelcome />
      <HeadingBlock title="🍔 Choose your restaurant" />

      {restaurantsLoading ? (
        <Spinner />
      ) : (
        <RestaurantsSelection restaurants={restaurants} />
      )}
    </Container>
  );
}
