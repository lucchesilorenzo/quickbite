import { useEffect } from "react";

import { Container } from "@mui/material";

import DesktopAreaLayout from "@/components/area/layouts/DesktopAreaLayout";
import MobileAreaLayout from "@/components/area/layouts/MobileAreaLayout";
import { useAddress } from "@/hooks/contexts/useAddress";
import { useRestaurant } from "@/hooks/contexts/useRestaurant";

export default function AreaPage() {
  const {
    restaurants,
    isRestaurantsLoading,
    restaurantsError,
    isMapViewMobile,
  } = useRestaurant();
  const { currentAddress } = useAddress();

  useEffect(() => {
    document.title = `Restaurants and takeaways in ${currentAddress?.address.city || currentAddress?.address.postcode || "your area"} | QuickBite`;
  }, [currentAddress]);

  const isLoading = isRestaurantsLoading;
  const hasNoResults = !restaurants.length || restaurantsError;

  return (
    <Container
      maxWidth="lg"
      component="main"
      disableGutters
      sx={{ p: isMapViewMobile ? 0 : 3 }}
    >
      <DesktopAreaLayout isLoading={isLoading} hasNoResults={hasNoResults} />
      <MobileAreaLayout isLoading={isLoading} hasNoResults={hasNoResults} />
    </Container>
  );
}
