import { Stack } from "@mui/material";

import NoRestaurantsOrLoading from "../common/NoRestaurantsOrLoading";
import RestaurantMap from "../content/search-and-map/restaurant-map/RestaurantMap";
import RestaurantListMobile from "../mobile/RestaurantListMobile";

import { useRestaurants } from "@/hooks/contexts/public/useRestaurants";

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
    return viewMap ? <RestaurantMap /> : <RestaurantListMobile />;
  }

  return (
    <Stack sx={{ display: { xs: "flex", lg: "none" } }}>
      {renderRestaurantContent()}
    </Stack>
  );
}
