import { useEffect } from "react";

import { Container } from "@mui/material";

import Spinner from "@/components/common/Spinner";
import HeadingBlock from "@/components/partner/restaurant/common/HeadingBlock";
import RestaurantsSelection from "@/components/partner/restaurants/RestaurantsSelection";
import RestaurantsWelcome from "@/components/partner/restaurants/RestaurantsWelcome";
import { useGetPartnerRestaurants } from "@/hooks/react-query/private/partner/restaurants/restaurant/useGetPartnerRestaurants";

export default function PartnerRestaurantsPage() {
  const { data: restaurants = [], isLoading } = useGetPartnerRestaurants();

  useEffect(() => {
    document.title = "Choose your restaurant | QuickBite";
  }, []);

  return (
    <Container component="main" maxWidth="md" sx={{ mt: 3 }}>
      <RestaurantsWelcome />
      <HeadingBlock title="🍔 Choose your restaurant" />

      {isLoading ? (
        <Spinner />
      ) : (
        <RestaurantsSelection restaurants={restaurants} />
      )}
    </Container>
  );
}
