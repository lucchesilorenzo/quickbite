import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNotifications } from "@toolpad/core/useNotifications";

import { getPartnerRestaurants } from "@/api/backend/endpoints/partner-restaurants/partner-restaurants";
import {
  UpdatePartnerRestaurantApprovedStatus200,
  UpdatePartnerRestaurantApprovedStatus422,
  UpdatePartnerRestaurantApprovedStatus500,
} from "@/api/backend/models";
import api from "@/lib/api-client";
import { ApiError } from "@/lib/api-error";

type UseUpdateRestaurantApprovedStatusOptions = {
  restaurantId: string;
};

export function useUpdateRestaurantApprovedStatus({
  restaurantId,
}: UseUpdateRestaurantApprovedStatusOptions) {
  const queryClient = useQueryClient();
  const notifications = useNotifications();

  return useMutation<
    UpdatePartnerRestaurantApprovedStatus200,
    ApiError<
      | UpdatePartnerRestaurantApprovedStatus422
      | UpdatePartnerRestaurantApprovedStatus500
    >,
    void
  >({
    mutationFn: async () => {
      const response =
        await getPartnerRestaurants(api).updatePartnerRestaurantApprovedStatus(
          restaurantId,
        );

      return response.data;
    },
    onSuccess: (response) => {
      queryClient.invalidateQueries({
        queryKey: ["partner-restaurants", restaurantId],
      });

      notifications.show(response.message, {
        key: "partner-update-restaurant-approved-status-success",
        severity: "success",
      });
    },
    onError: (error) => {
      notifications.show(error.message, {
        key: "partner-update-restaurant-approved-status-error",
        severity: "error",
      });
    },
  });
}
