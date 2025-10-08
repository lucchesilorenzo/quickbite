import { useQuery } from "@tanstack/react-query";

import { fetchData } from "@/lib/api-client";
import { UserNotificationWithUnreadCount } from "@/types";

type GetPartnerNotificationsProps = {
  userId?: string;
  restaurantId?: string;
  page: number;
};

export function useGetPartnerNotifications({
  userId,
  restaurantId,
  page = 1,
}: GetPartnerNotificationsProps) {
  return useQuery({
    queryKey: ["partner-notifications", restaurantId, page],
    queryFn: (): Promise<UserNotificationWithUnreadCount> =>
      fetchData(
        `/partner/restaurants/${restaurantId}/notifications?page=${page}`,
      ),
    enabled: !!userId && !!restaurantId,
  });
}
