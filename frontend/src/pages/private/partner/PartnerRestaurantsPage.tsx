import { useEffect } from "react";

import { Container } from "@mui/material";

import Spinner from "@/components/common/Spinner";
import PartnerHeadingBlock from "@/components/partner/restaurant/common/PartnerHeadingBlock";
import PartnerRestaurantsSelection from "@/components/partner/restaurants/PartnerRestaurantsSelection";
import PartnerRestaurantsWelcome from "@/components/partner/restaurants/PartnerRestaurantsWelcome";
import { useGetPartnerRestaurants } from "@/hooks/react-query/private/partners/restaurants/restaurant/useGetPartnerRestaurants";

export default function PartnerRestaurantsPage() {
  const { data: restaurants = [], isLoading } = useGetPartnerRestaurants();

  useEffect(() => {
    document.title = "Choose your restaurant | QuickBite";
  }, []);

  return (
    <Container component="main" maxWidth="md" sx={{ mt: 3 }}>
      <PartnerRestaurantsWelcome />
      <PartnerHeadingBlock title="🍔 Choose your restaurant" />

      {isLoading ? (
        <Spinner />
      ) : (
        <PartnerRestaurantsSelection restaurants={restaurants} />
      )}
    </Container>
  );
}
