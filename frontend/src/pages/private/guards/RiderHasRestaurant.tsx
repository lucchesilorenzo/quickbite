import { useRestaurant } from "@rider/contexts/RestaurantProvider";
import { Navigate, Outlet } from "react-router-dom";

import Spinner from "@/components/common/Spinner";
import { riderRoutes } from "@/features/private/rider/lib/data/navigation.data";

export default function RiderHasRestaurant() {
  const { restaurantData, isLoadingRestaurant } = useRestaurant();

  if (isLoadingRestaurant) {
    return <Spinner />;
  }

  const isRouteVisible = riderRoutes.some(
    ({ href }) =>
      href === "/rider/my-restaurant" &&
      restaurantData?.restaurant?.pivot.is_active,
  );

  if (!isRouteVisible) {
    return <Navigate to="/rider/job-posts" replace />;
  }

  return <Outlet />;
}
