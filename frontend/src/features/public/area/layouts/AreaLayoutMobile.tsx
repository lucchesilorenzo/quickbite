import { Stack } from "@mui/material";

import NoRestaurantsOrLoading from "../components/NoRestaurantsOrLoading";
import RestaurantsList from "../restaurants/RestaurantsList";
import RestaurantMap from "../search-bar/restaurant-map/RestaurantMap";

import { useRestaurants } from "@/contexts/RestaurantsProvider";

type AreaLayoutMobileProps = {
  isLoading: boolean;
  hasNoResults: boolean | Error | null;
};

export default function AreaLayoutMobile({
  isLoading,
  hasNoResults,
}: AreaLayoutMobileProps) {
  const { viewMap } = useRestaurants();

  // Render the correct content
  function renderRestaurantContent() {
    if (isLoading) return <NoRestaurantsOrLoading type="isLoading" />;
    if (hasNoResults) return <NoRestaurantsOrLoading type="noRestaurants" />;
    return viewMap ? <RestaurantMap /> : <RestaurantsList />;
  }

  return (
    <Stack sx={{ display: { xs: "flex", lg: "none" } }}>
      {renderRestaurantContent()}
    </Stack>
  );
}
