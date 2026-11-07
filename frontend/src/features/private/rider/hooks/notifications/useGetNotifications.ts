import { useQuery } from "@tanstack/react-query";

import { getRiderNotifications } from "@/api/endpoints/rider-notifications/rider-notifications";
import { GetRiderNotifications200 } from "@/api/models";
import api from "@/lib/api-client";

type UseGetNotificationsOptions = {
  userId?: string;
  page: number;
};

export function useGetNotifications({
  userId,
  page,
}: UseGetNotificationsOptions) {
  return useQuery<GetRiderNotifications200>({
    queryKey: ["rider-notifications", userId, page],
    queryFn: async () => {
      const response = await getRiderNotifications(api).getRiderNotifications({
        page,
      });

      return response.data;
    },
    enabled: !!userId && !!page,
  });
}
