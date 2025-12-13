import { GetNotificationsResponse } from "@partner/types/notifications/notification.api.types";
import { useQuery } from "@tanstack/react-query";

import { fetchData } from "@/lib/api-client";

type UseGetNotificationsOptions = {
  userId?: string;
  restaurantId?: string;
  page: number;
};

export function useGetNotifications({
  userId,
  restaurantId,
  page = 1,
}: UseGetNotificationsOptions) {
  return useQuery<GetNotificationsResponse>({
    queryKey: ["partner-notifications", restaurantId, page],
    queryFn: () =>
      fetchData(
        `/partner/restaurants/${restaurantId}/notifications?page=${page}`,
      ),
    enabled: !!userId && !!restaurantId,
  });
}
