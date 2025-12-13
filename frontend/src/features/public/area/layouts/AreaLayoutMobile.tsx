import { Stack } from "@mui/material";

import RestaurantsList from "../restaurants/RestaurantsList";
import RestaurantMap from "../search-bar/restaurant-map/RestaurantMap";

import FullPageErrorMessage from "@/components/common/FullPageErrorMessage";
import Spinner from "@/components/common/Spinner";
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
    if (isLoading) {
      return <Spinner />;
    }

    if (hasNoResults) {
      return (
        <FullPageErrorMessage
          message="No restaurants found in this area"
          secondaryMessage="Try adjusting your filters or searching a different location."
        />
      );
    }

    return viewMap ? <RestaurantMap /> : <RestaurantsList />;
  }

  return (
    <Stack sx={{ display: { xs: "flex", lg: "none" } }}>
      {renderRestaurantContent()}
    </Stack>
  );
}
