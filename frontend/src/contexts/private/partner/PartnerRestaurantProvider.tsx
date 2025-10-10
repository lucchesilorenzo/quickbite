import { createContext, useState } from "react";

import { Navigate } from "react-router-dom";

import FullPageSpinner from "@/components/common/FullPageSpinner";
import { useAuth } from "@/hooks/contexts/public/useAuth";
import { useGetNotifications } from "@/hooks/react-query/private/partner/notifications/useGetNotifications";
import { useGetRestaurant } from "@/hooks/react-query/private/partner/restaurants/restaurant/useGetRestaurant";
import { userNotificationsDefaults } from "@/lib/query-defaults";
import {
  PartnerRestaurantDetail,
  UserNotificationWithUnreadCount,
} from "@/types";

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

export const PartnerRestaurantContext =
  createContext<PartnerRestaurantContext | null>(null);

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
