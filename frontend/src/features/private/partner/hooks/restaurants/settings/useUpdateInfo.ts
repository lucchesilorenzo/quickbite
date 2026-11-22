import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNotifications } from "@toolpad/core/useNotifications";

import { getPartnerRestaurants } from "@/api/backend/endpoints/partner-restaurants/partner-restaurants";
import {
  UpdateInfoRequest,
  UpdatePartnerRestaurantInfo200,
  UpdatePartnerRestaurantInfo404,
  UpdatePartnerRestaurantInfo500,
} from "@/api/backend/models";
import api from "@/lib/api-client";
import { ApiError } from "@/lib/api-error";

type UseUpdateInfoOptions = {
  restaurantId: string;
};

export function useUpdateInfo({ restaurantId }: UseUpdateInfoOptions) {
  const queryClient = useQueryClient();
  const notifications = useNotifications();

  return useMutation<
    UpdatePartnerRestaurantInfo200,
    ApiError<UpdatePartnerRestaurantInfo404 | UpdatePartnerRestaurantInfo500>,
    UpdateInfoRequest
  >({
    mutationFn: async (data) => {
      const response = await getPartnerRestaurants(
        api,
      ).updatePartnerRestaurantInfo(restaurantId, data);

      return response.data;
    },
    onSuccess: (response) => {
      queryClient.invalidateQueries({
        queryKey: ["partner-restaurants", restaurantId],
      });

      notifications.show(response.message, {
        key: "partner-update-restaurant-info-success",
        severity: "success",
      });
    },
    onError: (error) => {
      notifications.show(error.message, {
        key: "partner-update-restaurant-info-error",
        severity: "error",
      });
    },
  });
}
