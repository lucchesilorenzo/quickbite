import { createContext, useContext, useState } from "react";

import { useGetNotifications } from "@partner/hooks/notifications/useGetNotifications";
import { useGetRestaurant } from "@partner/hooks/restaurants/restaurant/useGetRestaurant";
import { Navigate } from "react-router-dom";

import { GetNotificationsResponse } from "../types/notifications/notification.api.types";
import { PartnerRestaurantDetail } from "../types/restaurants/restaurant.types";

import FullPageSpinner from "@/components/common/FullPageSpinner";
import { useAuth } from "@/contexts/AuthProvider";
import { notificationsDefaults } from "@/lib/query-defaults";

type RestaurantProviderProps = {
  children: React.ReactNode;
  restaurantId?: string;
};

type RestaurantContext = {
  restaurant: PartnerRestaurantDetail;
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
    data: restaurant,
    isLoading,
    isError,
  } = useGetRestaurant({ restaurantId });

  if (isLoading || isLoadingNotifications) {
    return <FullPageSpinner />;
  }

  if (isError || !restaurant) {
    return <Navigate to="*" />;
  }

  return (
    <RestaurantContext.Provider
      value={{
        restaurant,
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
