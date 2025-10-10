import { useQuery } from "@tanstack/react-query";

import { fetchData } from "@/lib/api-client";
import { UserNotificationWithUnreadCount } from "@/types";

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
