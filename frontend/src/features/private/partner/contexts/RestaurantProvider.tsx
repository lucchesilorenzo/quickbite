import { createContext, useContext, useState } from "react";

import { useGetNotifications } from "@partner/hooks/notifications/useGetNotifications";
import { useGetRestaurant } from "@partner/hooks/restaurants/restaurant/useGetRestaurant";
import { Navigate } from "react-router-dom";

import { PartnerRestaurantDetail } from "../types/restaurant.types";

import FullPageSpinner from "@/components/common/FullPageSpinner";
import { useAuth } from "@/contexts/AuthProvider";
import { UserNotificationWithUnreadCount } from "@/features/private/partner/types/notification.types";
import { userNotificationsDefaults } from "@/lib/query-defaults";

type RestaurantProviderProps = {
  children: React.ReactNode;
  restaurantId?: string;
};

type RestaurantContext = {
  restaurant: PartnerRestaurantDetail;
  partnerNotifications: UserNotificationWithUnreadCount;
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
    data: partnerNotifications = userNotificationsDefaults,
    isLoading: isLoadingPartnerNotifications,
  } = useGetNotifications({ userId: user?.id, restaurantId, page });

  const {
    data: restaurant,
    isLoading,
    isError,
  } = useGetRestaurant(restaurantId);

  if (isLoading || isLoadingPartnerNotifications) return <FullPageSpinner />;
  if (isError || !restaurant) return <Navigate to="*" />;

  return (
    <RestaurantContext.Provider
      value={{ restaurant, partnerNotifications, page, setPage }}
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
