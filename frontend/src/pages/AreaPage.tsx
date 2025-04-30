import { useEffect } from "react";

import { Container, Grid } from "@mui/material";
import { useCookies } from "react-cookie";
import { useParams } from "react-router-dom";

import NoRestaurantsOrLoading from "@/components/area/content/NoRestaurantsOrLoading";
import RestaurantList from "@/components/area/content/RestaurantList";
import RestaurantFiltersSidebar from "@/components/area/sidebar/RestaurantFiltersSidebar";
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
        <Grid size={{ xs: 12, md: 3 }}>
          <RestaurantFiltersSidebar />
        </Grid>

        <Grid size={{ xs: 12, md: 9 }}>
          {isLoading ? (
            <NoRestaurantsOrLoading type="isLoading" />
          ) : hasNoResults ? (
            <NoRestaurantsOrLoading type="noRestaurants" />
          ) : (
            <RestaurantList />
          )}
        </Grid>
      </Grid>
    </Container>
  );
}
