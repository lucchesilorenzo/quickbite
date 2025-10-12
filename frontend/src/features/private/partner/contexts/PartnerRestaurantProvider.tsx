import { createContext, useContext, useState } from "react";

import { useGetNotifications } from "@partner/hooks/notifications/useGetNotifications";
import { useGetRestaurant } from "@partner/hooks/restaurants/restaurant/useGetRestaurant";
import { UserNotificationWithUnreadCount } from "@partner/types/notification-types";
import { Navigate } from "react-router-dom";

import { PartnerRestaurantDetail } from "../types/restaurant-types";

import FullPageSpinner from "@/components/FullPageSpinner";
import { useAuth } from "@/contexts/AuthProvider";
import { userNotificationsDefaults } from "@/lib/query-defaults";

type PartnerRestaurantProviderProps = {
  children: React.ReactNode;
  restaurantId?: string;
};

type PartnerRestaurantContext = {
  restaurant: PartnerRestaurantDetail;
  partnerNotifications: UserNotificationWithUnreadCount;
  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
};

const PartnerRestaurantContext = createContext<PartnerRestaurantContext | null>(
  null,
);

export default function PartnerRestaurantProvider({
  children,
  restaurantId,
}: PartnerRestaurantProviderProps) {
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
    <PartnerRestaurantContext.Provider
      value={{ restaurant, partnerNotifications, page, setPage }}
    >
      {children}
    </PartnerRestaurantContext.Provider>
  );
}

export function usePartnerRestaurant() {
  const context = useContext(PartnerRestaurantContext);

  if (!context) {
    throw new Error(
      "usePartnerRestaurant must be used within a PartnerRestaurantProvider.",
    );
  }

  return context;
}
