import { useQuery } from "@tanstack/react-query";

import { getPartnerNotifications } from "@/api/backend/endpoints/partner-notifications/partner-notifications";
import {
  GetPartnerNotifications200,
  GetPartnerNotifications500,
} from "@/api/backend/models";
import api from "@/lib/api-client";
import { ApiError } from "@/lib/api-error";

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
  return useQuery<
    GetPartnerNotifications200,
    ApiError<GetPartnerNotifications500>
  >({
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
