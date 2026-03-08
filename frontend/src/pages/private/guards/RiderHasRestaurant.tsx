import { useRestaurant } from "@rider/contexts/RestaurantProvider";
import { Navigate, Outlet } from "react-router-dom";

import Spinner from "@/components/common/Spinner";

export default function RiderHasRestaurant() {
  const { restaurantData, isLoadingRestaurant, restaurantError } =
    useRestaurant();

  if (isLoadingRestaurant) {
    return <Spinner />;
  }

  if (restaurantError || !restaurantData?.restaurant?.pivot?.is_active) {
    return <Navigate to="/rider/job-posts" replace />;
  }

  return <Outlet />;
}
