import { useEffect } from "react";

import { Container } from "@mui/material";
import { useCookies } from "react-cookie";
import { useParams } from "react-router-dom";

import DesktopAreaLayout from "@/components/area/layouts/DesktopAreaLayout";
import MobileAreaLayout from "@/components/area/layouts/MobileAreaLayout";
import { useRestaurant } from "@/hooks/contexts/useRestaurant";
import { useGetLocation } from "@/hooks/react-query/public/locationiq/useGetLocation";

export default function AreaPage() {
  const {
    restaurants,
    isRestaurantsLoading,
    restaurantsError,
    isMapViewMobile,
  } = useRestaurant();
  const { areaSlug } = useParams();
  const [cookies, setCookie] = useCookies(["address"]);

  const [postcode, city] = areaSlug ? areaSlug.split("-") : [];

  const {
    data: location = [],
    isLoading: isLocationLoading,
    error: locationError,
  } = useGetLocation({
    postcode,
    enabled: !!postcode && !cookies.address,
  });

  const displayName =
    !postcode || !city ? location[0]?.display_name : `${city}, ${postcode}`;

  useEffect(() => {
    document.title = `Restaurants and takeaways in ${displayName || "your area"} | QuickBite`;
  }, [displayName]);

  useEffect(() => {
    if (location && location[0]) {
      setCookie("address", location[0]);
    }
  }, [location, setCookie]);

  const isLoading = isLocationLoading || isRestaurantsLoading;
  const hasNoResults = locationError || !restaurants.length || restaurantsError;

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
