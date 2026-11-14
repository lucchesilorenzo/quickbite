import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNotifications } from "@toolpad/core/useNotifications";

import { getPartnerRestaurants } from "@/api/endpoints/partner-restaurants/partner-restaurants";
import { UpdatePartnerRestaurantApprovedStatus200 } from "@/api/models";
import api from "@/lib/api-client";

type UseUpdateRestaurantApprovedStatusOptions = {
  restaurantId: string;
};

export function useUpdateRestaurantApprovedStatus({
  restaurantId,
}: UseUpdateRestaurantApprovedStatusOptions) {
  const queryClient = useQueryClient();
  const notifications = useNotifications();

  return useMutation<UpdatePartnerRestaurantApprovedStatus200, Error, void>({
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
