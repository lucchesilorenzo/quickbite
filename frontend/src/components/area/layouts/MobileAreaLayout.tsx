import { Stack } from "@mui/material";

import NoRestaurantsOrLoading from "../content/NoRestaurantsOrLoading";
import RestaurantListMobile from "../mobile/RestaurantListMobile";

type MobileAreaLayoutProps = {
  isLoading: boolean;
  hasNoResults: boolean | Error | null;
};

export default function MobileAreaLayout({
  isLoading,
  hasNoResults,
}: MobileAreaLayoutProps) {
  // Render the correct content
  function renderRestaurantContent() {
    if (isLoading) return <NoRestaurantsOrLoading type="isLoading" />;
    if (hasNoResults) return <NoRestaurantsOrLoading type="noRestaurants" />;
    return <RestaurantListMobile />;
  }

  return (
    <Stack sx={{ display: { xs: "flex", lg: "none" } }}>
      {renderRestaurantContent()}
    </Stack>
  );
}
