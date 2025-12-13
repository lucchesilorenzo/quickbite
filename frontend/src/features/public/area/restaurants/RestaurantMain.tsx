import { Stack } from "@mui/material";

import RestaurantSearchContainer from "../search-bar/RestaurantSearchContainer";
import RestaurantMap from "../search-bar/restaurant-map/RestaurantMap";
import RestaurantsList from "./RestaurantsList";

import FullPageErrorMessage from "@/components/common/FullPageErrorMessage";
import Spinner from "@/components/common/Spinner";
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
    <Stack spacing={4}>
      <RestaurantSearchContainer />

      {renderRestaurantContent()}
    </Stack>
  );
}
