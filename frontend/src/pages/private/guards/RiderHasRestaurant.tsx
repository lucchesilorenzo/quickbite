import { useRestaurant } from "@rider/contexts/RestaurantProvider";
import { riderRoutes } from "@rider/lib/constants/navigation";
import { Navigate, Outlet } from "react-router-dom";

import Spinner from "@/components/common/Spinner";

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
