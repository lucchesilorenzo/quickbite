import { useQuery } from "@tanstack/react-query";

import { fetchData } from "@/lib/api-client";
import { UserNotification } from "@/types";

export function useGetUserNotifications(userId?: string) {
  return useQuery({
    queryKey: ["user-notifications"],
    queryFn: (): Promise<UserNotification> => fetchData("/auth/notifications"),
    enabled: !!userId,
  });
}
