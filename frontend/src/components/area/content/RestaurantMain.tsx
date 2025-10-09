import { Stack } from "@mui/material";

import NoRestaurantsOrLoading from "../common/NoRestaurantsOrLoading";
import RestaurantList from "./list/RestaurantList";
import RestaurantSearchContainer from "./search-and-map/RestaurantSearchContainer";
import RestaurantMap from "./search-and-map/restaurant-map/RestaurantMap";

import { useRestaurants } from "@/hooks/contexts/public/useRestaurants";

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
    return viewMap ? <RestaurantMap /> : <RestaurantList />;
  }

  return (
    <Stack spacing={4}>
      <RestaurantSearchContainer />

      {renderRestaurantContent()}
    </Stack>
  );
}
