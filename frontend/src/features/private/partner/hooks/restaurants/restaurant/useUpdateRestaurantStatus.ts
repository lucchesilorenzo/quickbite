import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNotifications } from "@toolpad/core/useNotifications";

import { getPartnerRestaurants } from "@/api/endpoints/partner-restaurants/partner-restaurants";
import {
  UpdatePartnerRestaurantStatus200,
  UpdateStatusRequest,
} from "@/api/models";
import api from "@/lib/api-client";

type UseUpdateRestaurantStatusOptions = {
  restaurantId: string;
};

export function useUpdateRestaurantStatus({
  restaurantId,
}: UseUpdateRestaurantStatusOptions) {
  const queryClient = useQueryClient();
  const notifications = useNotifications();

  return useMutation<
    UpdatePartnerRestaurantStatus200,
    Error,
    UpdateStatusRequest
  >({
    mutationFn: async (data) => {
      const response = await getPartnerRestaurants(
        api,
      ).updatePartnerRestaurantStatus(restaurantId, data);

      return response.data;
    },
    onSuccess: (response) => {
      queryClient.invalidateQueries({
        queryKey: ["partner-restaurant", restaurantId],
      });

      notifications.show(response.message, {
        key: "partner-update-restaurant-status-success",
        severity: "success",
      });
    },
    onError: (error) => {
      notifications.show(error.message, {
        key: "partner-update-restaurant-status-error",
        severity: "error",
      });
    },
  });
}
