import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNotifications } from "@toolpad/core/useNotifications";

import { getPartnerRestaurants } from "@/api/endpoints/partner-restaurants/partner-restaurants";
import {
  UpdateDeliveryTimesRequest,
  UpdatePartnerRestaurantDeliveryTimes200,
} from "@/api/models";
import api from "@/lib/api-client";

type UseUpdateDeliveryTimesOptions = {
  restaurantId: string;
};

export function useUpdateDeliveryTimes({
  restaurantId,
}: UseUpdateDeliveryTimesOptions) {
  const queryClient = useQueryClient();
  const notifications = useNotifications();

  return useMutation<
    UpdatePartnerRestaurantDeliveryTimes200,
    Error,
    UpdateDeliveryTimesRequest
  >({
    mutationFn: async (data) => {
      const response = await getPartnerRestaurants(
        api,
      ).updatePartnerRestaurantDeliveryTimes(restaurantId, data);

      return response.data;
    },
    onSuccess: (response) => {
      queryClient.invalidateQueries({
        queryKey: ["partner-restaurant", restaurantId],
      });

      notifications.show(response.message, {
        key: "partner-update-delivery-times-success",
        severity: "success",
      });
    },
    onError: (error) => {
      notifications.show(error.message, {
        key: "partner-update-delivery-times-error",
        severity: "error",
      });
    },
  });
}
