import { useQuery } from "@tanstack/react-query";

import { UserNotificationWithUnreadCount } from "@/features/private/partner/types/notification.types";
import { fetchData } from "@/lib/api-client";

type GetNotificationsProps = {
  userId?: string;
  restaurantId?: string;
  page: number;
};

export function useGetNotifications({
  userId,
  restaurantId,
  page = 1,
}: GetNotificationsProps) {
  return useQuery({
    queryKey: ["partner-notifications", restaurantId, page],
    queryFn: (): Promise<UserNotificationWithUnreadCount> =>
      fetchData(
        `/partner/restaurants/${restaurantId}/notifications?page=${page}`,
      ),
    enabled: !!userId && !!restaurantId,
  });
}
