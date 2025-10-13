import { Stack } from "@mui/material";

import NoRestaurantsOrLoading from "../components/NoRestaurantsOrLoading";
import RestaurantSearchContainer from "../search-bar/RestaurantSearchContainer";
import RestaurantMap from "../search-bar/restaurant-map/RestaurantMap";
import RestaurantsList from "./RestaurantsList";

import { useRestaurants } from "@/contexts/RestaurantsProvider";

type RestaurantMainProps = {
  isLoading: boolean;
  hasNoResults: boolean | Error | null;
};

export default function RestaurantMain({
  isLoading,
  hasNoResults,
}: RestaurantMainProps) {
  const { viewMap } = useRestaurants();

  // Render the correct content
  function renderRestaurantContent() {
    if (isLoading) return <NoRestaurantsOrLoading type="isLoading" />;
    if (hasNoResults) return <NoRestaurantsOrLoading type="noRestaurants" />;
    return viewMap ? <RestaurantMap /> : <RestaurantsList />;
  }

  return (
    <Stack spacing={4}>
      <RestaurantSearchContainer />

      {renderRestaurantContent()}
    </Stack>
  );
}
