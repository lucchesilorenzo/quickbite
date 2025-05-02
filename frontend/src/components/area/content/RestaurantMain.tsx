import { Stack } from "@mui/material";

import NoRestaurantsOrLoading from "./NoRestaurantsOrLoading";
import RestaurantList from "./RestaurantList";
import RestaurantSearchContainer from "./RestaurantSearchContainer";
import RestaurantMap from "./restaurant-map/RestaurantMap";

import { useRestaurant } from "@/hooks/contexts/useRestaurant";

type RestaurantMainProps = {
  isLoading: boolean;
  hasNoResults: boolean | Error | null;
};

export default function RestaurantMain({
  isLoading,
  hasNoResults,
}: RestaurantMainProps) {
  const { viewMap } = useRestaurant();

  // Render the correct content
  function renderRestaurantContent() {
    if (isLoading) return <NoRestaurantsOrLoading type="isLoading" />;
    if (hasNoResults) return <NoRestaurantsOrLoading type="noRestaurants" />;
    return viewMap ? <RestaurantMap /> : <RestaurantList />;
  }

  return (
    <Stack spacing={4}>
      <RestaurantSearchContainer />

      {renderRestaurantContent()}
    </Stack>
  );
}
