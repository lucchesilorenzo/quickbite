import { useEffect } from "react";

import { Box, Grid } from "@mui/material";
import { useParams } from "react-router-dom";

import ErrorPage from "./ErrorPage";

import Spinner from "@/components/common/Spinner";
import RestaurantCoverImage from "@/components/restaurants/RestaurantCoverImage";
import { useGetRestaurant } from "@/hooks/react-query/restaurants/useGetRestaurant";

export default function RestaurantPage() {
  const { restaurantSlug } = useParams();
  const {
    data: restaurant,
    isLoading: isRestaurantLoading,
    error: restaurantError,
  } = useGetRestaurant(restaurantSlug);

  useEffect(() => {
    if (restaurant?.name && restaurant?.city) {
      document.title = `${restaurant.name} restaurant menu in ${restaurant.city} - Order from QuickBite`;
    }
  }, [restaurant?.name, restaurant?.city]);

  if (isRestaurantLoading) return <Spinner />;

  if (!restaurant || restaurantError) {
    return <ErrorPage error={restaurantError} />;
  }

  return (
    <Box component="main">
      <Grid container>
        <Grid size={10}>
          <RestaurantCoverImage restaurant={restaurant} />
        </Grid>

        <Grid size={2}></Grid>
      </Grid>
    </Box>
  );
}
