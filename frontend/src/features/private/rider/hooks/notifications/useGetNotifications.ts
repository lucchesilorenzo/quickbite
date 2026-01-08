import { GetNotificationsResponse } from "@rider/types/notifications/notification.api.types";
import { useQuery } from "@tanstack/react-query";

import { fetchData } from "@/lib/api-client";

type UseGetNotificationsOptions = {
  page: number;
};

export function useGetNotifications({ page }: UseGetNotificationsOptions) {
  return useQuery<GetNotificationsResponse>({
    queryKey: ["rider-notifications", page],
    queryFn: () => fetchData(`/rider/notifications?page=${page}`),
  });
}
