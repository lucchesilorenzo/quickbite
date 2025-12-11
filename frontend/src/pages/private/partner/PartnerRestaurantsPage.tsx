import { useEffect } from "react";

import { Container, Typography } from "@mui/material";
import HeadingBlock from "@partner/components/HeadingBlock";
import { useGetRestaurants } from "@partner/hooks/restaurants/restaurant/useGetRestaurants";
import RestaurantsSelection from "@partner/restaurants/RestaurantsSelection";
import RestaurantsWelcome from "@partner/restaurants/RestaurantsWelcome";

import FullPageErrorMessage from "@/components/common/FullPageErrorMessage";
import Spinner from "@/components/common/Spinner";

export default function PartnerRestaurantsPage() {
  const {
    data: restaurantsData = { success: false, message: "", restaurants: [] },
    isLoading: isRestaurantsLoading,
    error: restaurantsError,
  } = useGetRestaurants();

  useEffect(() => {
    document.title = "Choose your restaurant | QuickBite";
  }, []);

  return (
    <Container component="main" maxWidth="md" sx={{ mt: 3 }}>
      <RestaurantsWelcome />
      <HeadingBlock title="🍔 Choose your restaurant" />

      {isRestaurantsLoading && <Spinner />}

      {!isRestaurantsLoading && restaurantsError && (
        <FullPageErrorMessage message={restaurantsError.message} />
      )}

      {!isRestaurantsLoading &&
        !restaurantsError &&
        restaurantsData.restaurants.length === 0 && (
          <Typography variant="body1" sx={{ my: 3 }}>
            You don't have any restaurants yet.
          </Typography>
        )}

      {!isRestaurantsLoading &&
        !restaurantsError &&
        restaurantsData.restaurants.length > 0 && (
          <RestaurantsSelection restaurants={restaurantsData.restaurants} />
        )}
    </Container>
  );
}
