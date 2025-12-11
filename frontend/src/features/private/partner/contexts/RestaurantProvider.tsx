import { createContext, useContext, useState } from "react";

import { useGetNotifications } from "@partner/hooks/notifications/useGetNotifications";
import { useGetRestaurant } from "@partner/hooks/restaurants/restaurant/useGetRestaurant";
import { Navigate } from "react-router-dom";

import { GetNotificationsResponse } from "../types/notifications/notification.api.types";
import { GetRestaurantResponse } from "../types/restaurants/restaurant.api.types";

import FullPageSpinner from "@/components/common/FullPageSpinner";
import { useAuth } from "@/contexts/AuthProvider";
import { notificationsDefaults } from "@/lib/query-defaults";

type RestaurantProviderProps = {
  children: React.ReactNode;
  restaurantId?: string;
};

type RestaurantContext = {
  restaurantData: GetRestaurantResponse;
  notificationsData: GetNotificationsResponse;
  notificationsError: Error | null;
  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
};

const RestaurantContext = createContext<RestaurantContext | null>(null);

export default function RestaurantProvider({
  children,
  restaurantId,
}: RestaurantProviderProps) {
  const { user } = useAuth();

  const [page, setPage] = useState(1);

  const {
    data: notificationsData = {
      success: false,
      message: "",
      notifications: notificationsDefaults,
      unread_count: 0,
    },
    isLoading: isLoadingNotifications,
    error: notificationsError,
  } = useGetNotifications({ userId: user?.id, restaurantId, page });

  const {
    data: restaurantData,
    isLoading: isLoadingRestaurant,
    error: restaurantError,
  } = useGetRestaurant({ restaurantId });

  if (isLoadingRestaurant || isLoadingNotifications) {
    return <FullPageSpinner />;
  }

  if (restaurantError || !restaurantData?.restaurant) {
    return <Navigate to="*" />;
  }

  return (
    <RestaurantContext.Provider
      value={{
        restaurantData,
        notificationsData,
        notificationsError,
        page,
        setPage,
      }}
    >
      {children}
    </RestaurantContext.Provider>
  );
}

export function useRestaurant() {
  const context = useContext(RestaurantContext);

  if (!context) {
    throw new Error("useRestaurant must be used within a RestaurantProvider.");
  }

  return context;
}
