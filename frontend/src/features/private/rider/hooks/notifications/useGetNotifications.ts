import { GetNotificationsResponse } from "@rider/types/notifications/notification.api.types";
import { useQuery } from "@tanstack/react-query";

import { fetchData } from "@/lib/api-client";

type UseGetNotificationsOptions = {
  userId?: string;
  page: number;
};

export function useGetNotifications({
  userId,
  page,
}: UseGetNotificationsOptions) {
  return useQuery<GetNotificationsResponse>({
    queryKey: ["rider-notifications", userId, page],
    queryFn: () => fetchData(`/rider/notifications?page=${page}`),
    enabled: !!userId && !!page,
  });
}
