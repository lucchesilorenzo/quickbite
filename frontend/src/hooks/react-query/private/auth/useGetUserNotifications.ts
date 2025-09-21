import { useQuery } from "@tanstack/react-query";

import { fetchData } from "@/lib/api-client";
import { UserNotificationWithUnreadCount } from "@/types";

export function useGetUserNotifications(userId?: string, page: number = 1) {
  return useQuery({
    queryKey: ["user-notifications", userId, page],
    queryFn: (): Promise<UserNotificationWithUnreadCount> =>
      fetchData(`/auth/notifications?page=${page}`),
    enabled: !!userId,
  });
}
