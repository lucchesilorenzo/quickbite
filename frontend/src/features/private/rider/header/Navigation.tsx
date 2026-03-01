import { Skeleton, Stack, Tab, Tabs } from "@mui/material";
import { Link, useLocation } from "react-router-dom";

import { useRestaurant } from "../contexts/RestaurantProvider";
import { riderRoutes } from "../lib/data/navigation.data";

export default function Navigation() {
  const { pathname } = useLocation();
  const { restaurantData, isLoadingRestaurant } = useRestaurant();

  if (isLoadingRestaurant) {
    return (
      <Stack
        direction="row"
        aria-busy="true"
        aria-label="Loading tabs"
        spacing={2}
      >
        {Array.from({ length: 2 }).map((_, index) => (
          <Skeleton
            key={index}
            variant="rectangular"
            animation="wave"
            width={100}
          />
        ))}
      </Stack>
    );
  }

  const visibleRoutes = riderRoutes.filter(
    ({ href }) =>
      href !== "/rider/my-restaurant" ||
      restaurantData?.restaurant?.pivot.is_active,
  );

  const activeTabValue = visibleRoutes.find((route) =>
    pathname.startsWith(route.href),
  )?.href;

  return (
    <Tabs value={activeTabValue || false} role="navigation">
      {visibleRoutes.map(({ href, label }) => (
        <Tab key={href} label={label} value={href} component={Link} to={href} />
      ))}
    </Tabs>
  );
}
