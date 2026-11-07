import { useQuery } from "@tanstack/react-query";

import { getPartnerNotifications } from "@/api/endpoints/partner-notifications/partner-notifications";
import { GetPartnerNotifications200 } from "@/api/models";
import api from "@/lib/api-client";

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
  return useQuery<GetPartnerNotifications200>({
    queryKey: ["partner-notifications", restaurantId, page],
    queryFn: async () => {
      const response = await getPartnerNotifications(
        api,
      ).getPartnerNotifications(restaurantId ?? "", { page });

      return response.data;
    },
    enabled: !!userId && !!restaurantId,
  });
}
