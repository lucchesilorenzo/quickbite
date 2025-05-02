import { useEffect } from "react";

import { Container, Grid } from "@mui/material";
import { useCookies } from "react-cookie";
import { useParams } from "react-router-dom";

import RestaurantMain from "@/components/area/content/RestaurantMain";
import RestaurantSidebar from "@/components/area/sidebar/RestaurantSidebar";
import { useRestaurant } from "@/hooks/contexts/useRestaurant";
import { useGetLocation } from "@/hooks/react-query/locationiq/useGetLocation";

export default function AreaPage() {
  const { restaurants, isRestaurantsLoading, restaurantsError } =
    useRestaurant();
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
    <Container maxWidth="lg" component="main" sx={{ p: 3 }}>
      <Grid container spacing={4}>
        <Grid size={3}>
          <RestaurantSidebar />
        </Grid>

        <Grid size={9}>
          <RestaurantMain isLoading={isLoading} hasNoResults={hasNoResults} />
        </Grid>
      </Grid>
    </Container>
  );
}
